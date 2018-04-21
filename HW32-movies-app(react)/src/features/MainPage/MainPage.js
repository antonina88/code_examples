import React from 'react';
import PropTypes from 'prop-types';

import Filter from './../Filter/Filter';
import MoviesList from './../Movies/MoviesList/MoviesList';
import LogOut from '../../Components/LogOut/LogOut';
import Language from '../Language/Language';
import withTranslation from '../../withTranslation/withTranslation';

const MainPage = (props) => {
  const { translations } = props;
  return (
    <div>
      <Filter translations={translations} />
      <div className='row'>
        <Language />
        <LogOut />
      </div>
      <MoviesList />
    </div>
  );
};

export default withTranslation(MainPage);

MainPage.propTypes = {
  translations: PropTypes.objectOf(PropTypes.string),
};

