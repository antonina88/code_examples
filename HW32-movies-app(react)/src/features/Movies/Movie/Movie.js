import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './movie.module.scss';
import Likes from '../../../Components/Likes/Likes';
import MovieRating from '../../../Components/MovieRating/MovieRating';

export const Movie = (props) => {
  const {
    addLike,
    changeRating,
    movie,
    removeLike,
  } = props;

  return (
    <div className={styles.movie}>
      <Link
        className={styles.movie__link}
        key={movie.id}
        to={`/movie/${movie.id}`}
      >
        <h3 className={styles.title}>
          {movie.title}
        </h3>
      </Link>

      <img
        alt='poster'
        className={styles.image}
        src={movie.posterUrl}
      />

      <Likes
        addLike={addLike}
        countLikes={movie.likes}
        id={movie.id}
        removeLike={removeLike}
      />

      <MovieRating
        changeRating={changeRating}
        movieStars={movie.stars}
      />
    </div>
  );
};

export default Movie;

Movie.propTypes = {
  addLike: PropTypes.func,
  changeRating: PropTypes.func,
  removeLike: PropTypes.func,
  movie: PropTypes.shape({
    changeRating: PropTypes.func,
    id: PropTypes.number,
    title: PropTypes.string,
    posterUrl: PropTypes.string,
    stars: PropTypes.number,
    likes: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    actors: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.string,
    description: PropTypes.string,
  }),
};
