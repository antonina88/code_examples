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
import styles from './register.module.scss';
import Language from '../../Language/Language';

import {
  fetchUsers,
  fetchSignUp,
} from '../authenticateActions';

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchSignUp: (user) => dispatch(fetchSignUp(user)),
});

export class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      open: false,
    };
  }

  handleSignUp = (event) => {
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

        if (user) {
          this.setState({
            message: translations.userAlreadyExists,
            open: true,
          });
        } else {
          const newUser = {
            name: login,
            password,
          };

          this.props.fetchSignUp(newUser);
        }
      });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { message, open } = this.state;
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
        <h1 className={styles.title}>{translations.registrationPage}</h1>
        <AuthForm
          formtype='register'
          handleLoginChange={this.handleLoginChange}
          handlePasswordChange={this.handlePasswordChange}
          onCLick={this.handleSignUp}
        >
          <div className={styles.text}>
            <p>{translations.alreadyHaveAnAccount}? </p>
            <Link
              className={styles.link}
              to={`/login`}
            >
              {translations.linkToLogin}
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
)(RegisterPage);

RegisterPage.propTypes = {
  fetchUsers: PropTypes.func,
  fetchSignUp: PropTypes.func,
  isUserLoggedIn: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    password: PropTypes.string,
  }),
  translations: PropTypes.objectOf(PropTypes.string),
};
