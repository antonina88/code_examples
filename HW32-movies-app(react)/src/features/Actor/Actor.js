import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Header from '../../Components/Header/Header';
import styles from './actor.module.scss';
import withTranslation from '../../withTranslation/withTranslation';

const mapStateToProps = (state, ownProps) => ({
  actor: state.movies.actors.find(actor => String(actor.name) === ownProps.match.params.name),
});

export const Actor = (props) => {
  const { actor, translations } = props;

  return (
    <div className={styles.actor}>
      <Header />
      <div className={styles.container}>
        <img
          alt='actor'
          className={styles.image}
          src={actor.imgUrl}
        />
        <p><strong>{translations.name}: </strong>{actor.name}</p>
        <p><strong>{translations.biography}: </strong>{actor.biography}</p>
      </div>
    </div>
  );
};

export default compose(
  withTranslation,
  connect(mapStateToProps),
)(Actor);

Actor.propTypes = {
  actor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    biography: PropTypes.string,
  }),
  translations: PropTypes.objectOf(PropTypes.string),
};
