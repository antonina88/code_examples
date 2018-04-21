import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.authenticate.userAuthorized,
});

function withUserPermission(WrappedComponent) {
  return (
    connect(mapStateToProps)(WrappedComponent)
  );
}

export default withUserPermission;