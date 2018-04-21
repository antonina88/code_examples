import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import withTranslation from '../../../withTranslation/withTranslation';
import Likes from '../../../Components/Likes/Likes';
import MovieRating from '../../../Components/MovieRating/MovieRating';
import Header from '../../../Components/Header/Header';
import styles from './movieDetails.module.scss';
import Button from '../../../Components/Button/Button';

import { getMovieDetails, getActors } from '../selector';

import {
  fetchAddLike,
  fetchRemoveLike,
  fetchRemoveMovie,
  updateRating,
} from '../moviesActions';

const mapStateToProps = (state, ownProps) => ({
  movie: getMovieDetails(state, ownProps),
  actors: getActors(state),
});

const mapDispatchToProps = (dispatch) => ({
  addLike: (id) => dispatch(fetchAddLike(id)),
  removeLike: (id) => dispatch(fetchRemoveLike(id)),
  removeMovie: (id) => dispatch(fetchRemoveMovie(id)),
  changeRating: (id, value) => dispatch(updateRating(id, value)),
});

export class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeletedMovie: false,
    };
  }

  removeMovie = () => {
    this.props.removeMovie(this.props.movie.id);
    this.setState({
      isDeletedMovie: true,
    });
  }

  render() {
    const { movie, addLike, removeLike, actors, changeRating, translations } = this.props;
    const { isDeletedMovie } = this.state;

    if (isDeletedMovie) {
      return <Redirect to='/' />;
    }

    let movieActors = [];

    const actorsId = movie.actorsIds;
    if (actorsId.length > 0) {
      actorsId.forEach(id => {
        const actor = actors.find(actor => actor.id === id);
        movieActors = [...movieActors, actor];
      });
    }

    const actorsList = movieActors.map(actor => {
      return (
        <Link
          className={styles.actors__link}
          key={actor && actor.name}
          to={`/actor/${actor && actor.name}`}
        >
          {actor && actor.name}
        </Link>
      );
    });

    return (
      <div className={styles.movie}>
        <Header />
        <div className={styles.container}>
          <div>
            <img
              alt='poster'
              className={styles.image}
              src={movie.posterUrl}
            />
            <MovieRating
              changeRating={(value) => {changeRating(movie.id, value)}}
              movieStars={movie.stars}
            />
            <Likes
              addLike={addLike}
              countLikes={movie.likes}
              id={movie.id}
              removeLike={removeLike}
            />
            <div className='row'>
              <Link
                className={styles.edit}
                to={`/edit/${movie.id}`}
              >
                {translations.edit}
              </Link>
              <Button
                className={styles.delete_btn}
                onClick={this.removeMovie}
              >
                {translations.delete}
              </Button>
            </div>
          </div>
          <div>
            <h3 className={styles.title}>{movie.title}</h3>
            <p><strong>{translations.director}:</strong> {movie.director}</p>
            <p><strong>{translations.genres}:</strong> {movie.genres.join(',')}</p>
            <p className={styles.actors}><strong>{translations.actors}: </strong>{actorsList}</p>
            <p className={styles.description}>
              <strong>{translations.description}: </strong> {movie.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withTranslation,
  connect(mapStateToProps, mapDispatchToProps),
)(MovieDetails);

MovieDetails.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.object),
  addLike: PropTypes.func,
  changeRating: PropTypes.func,
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    posterUrl: PropTypes.string,
    stars: PropTypes.number,
    likes: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.string,
    description: PropTypes.string,
  }),
  removeMovie: PropTypes.func,
  removeLike: PropTypes.func,
  translations: PropTypes.objectOf(PropTypes.string),
};
