import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import StarIcon from '../Icons/StarIcon';
import styles from './rating.module.scss';

const cx = classNames.bind(styles);

export const MovieRating = ({ movieStars, changeRating }) => {
  const ratingValues = [1, 2, 3, 4, 5];

  const ratingList = ratingValues.map((item, index) => {
    const className = cx({
      active: (index + 1) <= movieStars,
    });

    return (
      <StarIcon
        changeRating={changeRating}
        isActiveClass={className}
        key={item}
        value={item}
      />
    );
  });

  return (
    <div className={styles.rating}>
      {ratingList}
    </div>
  );
};

export default MovieRating;

MovieRating.propTypes = {
  changeRating: PropTypes.func,
  movieStars: PropTypes.number,
};
