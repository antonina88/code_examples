import React from 'react';
import PropTypes from 'prop-types';

import LikeIcon from '../Icons/LikeIcon';
import DislikeIcon from '../Icons/DislikeIcon';
import withTranslation from '../../withTranslation/withTranslation';

export const Likes = ({ id, addLike, removeLike, countLikes, translations }) => {
  return (
    <div className='likes'>
      <div className='likes_items'>
        <LikeIcon
          addLike={addLike}
          id={id}
        />
        <DislikeIcon
          id={id}
          removeLike={removeLike}
        />
      </div>
      <p><strong>{translations && translations.likes}: </strong>{countLikes}</p>
    </div>
  );
};

export default withTranslation(Likes);

Likes.propTypes = {
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
  countLikes: PropTypes.number,
  id: PropTypes.number,
  translations: PropTypes.objectOf(PropTypes.string),
};
