import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.authenticate.userAuthorized,
});

class PrivateRoute extends Component {
  render() {
    const { isUserLoggedIn, ...props } = this.props;

    return isUserLoggedIn
      ? <Route {...props} />
      : <Redirect to='/login' />;
  }
}

export default connect(mapStateToProps)(PrivateRoute);

PrivateRoute.propTypes = {
  isUserLoggedIn: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    password: PropTypes.string,
  }),
};
