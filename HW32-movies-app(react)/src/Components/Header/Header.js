import React from 'react';
import { Link }from 'react-router-dom';
import PropTypes from 'prop-types';

import LogOut from '../LogOut/LogOut';
import Language from '../../features/Language/Language';
import withTranslation from '../../withTranslation/withTranslation';

export const Header = (props) => {
  const { translations } = props;
  return (
    <div>
      <div className='row'>
        <Language />
        <LogOut />
      </div>
      <Link
        className='home_link'
        to='/'
      >
        {translations.homeLink}
      </Link>
    </div>
  );
};

export default withTranslation(Header);

Header.propTypes = {
  translations: PropTypes.objectOf(PropTypes.string),
};
