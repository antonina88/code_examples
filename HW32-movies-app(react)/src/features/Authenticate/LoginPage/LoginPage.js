import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import withUserPermission from '../../../withUserPermission/withUserPermission';
import withTranslation from '../../../withTranslation/withTranslation';
import AuthForm from '../AuthForm/AuthForm';
import styles from './login.module.scss';
import Language from '../../Language/Language';

import {
  fetchUsers,
  fetchSignIn,
} from '../authenticateActions';

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchSignIn: (user) => dispatch(fetchSignIn(user)),
});

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      message: '',
    };
  }

  handleLogIn = (event) => {
    const { login, password } = event;
    const { translations } = this.props;

    if (!login || !password) {
      this.setState({
        message: translations.fieldsNotFilled,
        open: true,
      });

      return false;
    }

    this.props.fetchUsers()
      .then(users => {
        const user = users.find(user => user.name === login);

        if (!user) {
          this.setState({
            message: translations.userNotFound,
            open: true,
          });
        }

        if (user && user.password !== password) {
          this.setState({
            message: translations.passwordIsIncorrect,
            open: true,
          });
        }

        if (user && user.password === password) {
          this.props.fetchSignIn(user.id);
        }
      });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { open, message } = this.state;
    const { isUserLoggedIn, translations } = this.props;
    const isPrimary = true;

    if (isUserLoggedIn) {
      return <Redirect to='/' />;
    }

    const actions = [
      <FlatButton
        label={translations.close}
        onClick={this.handleClose}
        primary={isPrimary}
      />,
    ];

    const alert = open? [
      <Dialog
        actions={actions}
        modal={false}
        onRequestClose={this.handleClose}
        open={open}
      >
        {message}
      </Dialog>,
    ]: null;

    return (
      <div className={styles.wrapper}>
        <Language />
        <h1 className={styles.title}>{translations.authorizationPage}</h1>
        <AuthForm
          formtype='login'
          handleLoginChange={this.handleLoginChange}
          handlePasswordChange={this.handlePasswordChange}
          onCLick={this.handleLogIn}
        >
          <div className={styles.text}>
            <p>{translations.doNotHaveAccount}?</p>
            <Link
              className={styles.link}
              to={`/register`}
            >
              {translations.linkToRegister}
            </Link>
            {alert}
          </div>
        </AuthForm>
      </div>
    );
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  withUserPermission,
  withTranslation,
)(LoginPage);

LoginPage.propTypes = {
  fetchUsers: PropTypes.func,
  fetchSignIn: PropTypes.func,
  isUserLoggedIn: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    password: PropTypes.string,
  }),
  translations: PropTypes.objectOf(PropTypes.string),
};
