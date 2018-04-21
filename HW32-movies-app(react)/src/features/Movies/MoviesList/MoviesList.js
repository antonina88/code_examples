import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Movie from '../Movie/Movie';
import styles from './moviesList.module.scss';
import { getMovies } from '../selector';

import {
  fetchAddLike,
  updateRating,
  fetchMovies,
  fetchRemoveLike,
  fetchActors,
} from '../moviesActions';

const mapStateToProps = (state) => ({
  movies: getMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  receiveMovies: (movies) => dispatch(fetchMovies(movies)),
  receiveActors: (actors) => dispatch(fetchActors(actors)),
  addLike: (id) => dispatch(fetchAddLike(id)),
  removeLike: (id) => dispatch(fetchRemoveLike(id)),
  changeRating: (id, value) => dispatch(updateRating(id, value)),
});

export class MoviesList extends Component {
  componentDidMount() {
    this.props.receiveMovies();
    this.props.receiveActors();
  }

  render() {
    const {
      addLike,
      changeRating,
      movies,
      removeLike,
    } = this.props;

    const moviesList = movies && movies.map(movie => {
      return (
        <Movie
          addLike={addLike}
          changeRating={(value) => {changeRating(movie.id, value)}}
          key={movie.id}
          movie={movie}
          removeLike={removeLike}
        />
      );
    });

    return (
      <div className={styles.list}>
        {moviesList}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesList);

MoviesList.propTypes = {
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
  changeRating: PropTypes.func,
  receiveMovies: PropTypes.func,
  movies: PropTypes.arrayOf(PropTypes.object),
  receiveActors: PropTypes.func,
};
