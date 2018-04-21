import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Button from '../../Components/Button/Button';
import { logOut } from '../../features/Authenticate/authenticateActions';
import withTranslation from '../../withTranslation/withTranslation';

const mapDispatchToProps = (dispatch) => ({
  userLogOut: () => dispatch(logOut()),
});

export const LogOut = ({ userLogOut, translations }) => {
  return (
    <Button
      className='btn btn-info'
      onClick={userLogOut}
    >
      {translations && translations.logOut}
    </Button>
  );
};

export default compose(
  withTranslation,
  connect(null, mapDispatchToProps),
)(LogOut);

LogOut.propTypes = {
  userLogOut: PropTypes.func,
  translations: PropTypes.objectOf(PropTypes.string),
};