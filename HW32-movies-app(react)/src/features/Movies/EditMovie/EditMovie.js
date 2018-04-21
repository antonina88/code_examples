import React, { Component } from 'react';
import { connect }from 'react-redux';
import { compose } from 'redux';
import { updateMovie } from '../moviesActions';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import { getEditMovie } from './selector';
import withTranslation from '../../../withTranslation/withTranslation';
import Header from '../../../Components/Header/Header';
import Button from '../../../Components/Button/Button';
import styles from './editMovie.module.scss';

const mapStateToProps = (state, ownProps) => ({
  movie: getEditMovie(state, ownProps),
});

const mapDispatchToProps = (dispatch) => ({
  updateMovie: (movie) => dispatch(updateMovie(movie)),
});

export class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.movie.title,
      posterUrl: props.movie.posterUrl,
      director: props.movie.director,
      genres: props.movie.genres,
      description: props.movie.description,
      isEdited: false,
    };
  }

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleChangePosterUrl = (event) => {
    this.setState({
      posterUrl: event.target.value,
    });
  };

  handleChangeDirector = (event) => {
    this.setState({
      director: event.target.value,
    });
  };

  handleChangeGenres = (event) => {
    const genres = event.target.value.split(',').map(genre => genre.trim());

    this.setState({
      genres,
    });
  };

  handleChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onSave = () => {
    const movie = { ...this.props.movie, ...this.state };
    this.props.updateMovie(movie);

    this.setState({
      isEdited: true,
    });
  };

  render() {
    const { title, posterUrl, director, genres, description, isEdited } = this.state;
    const { movie, translations } = this.props;

    if (isEdited) {
      return <Redirect to={`/movie/${movie.id}`} />;
    }

    return (
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.edit_container}>
          <p className={styles.text}>{translations.movieTitle}: </p>
          <input
            className='form-control'
            onChange={this.handleChangeTitle}
            value={title}
          />
          <p className={styles.text}>{translations.imgUrl}: </p>
          <input
            className='form-control'
            onChange={this.handleChangePosterUrl}
            value={posterUrl}
          />
          <p className={styles.text}>{translations.director}: </p>
          <input
            className='form-control'
            onChange={this.handleChangeDirector}
            value={director}
          />
          <p className={styles.text}>{translations.genres}: </p>
          <input
            className='form-control'
            onChange={this.handleChangeGenres}
            value={genres}
          />
          <p className={styles.text}>{translations.description}: </p>
          <textarea
            className='form-control'
            onChange={this.handleChangeDescription}
            value={description}
          />
          <Button
            className='btn btn-success'
            onClick={this.onSave}
          >
            {translations.saveBtn}
          </Button>
        </div>
      </div>
    );
  }
}

export default compose(
  withTranslation,
  connect(mapStateToProps, mapDispatchToProps),
)(EditMovie);

EditMovie.propTypes = {
  updateMovie: PropTypes.func,
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
  translations: PropTypes.objectOf(PropTypes.string),
};
