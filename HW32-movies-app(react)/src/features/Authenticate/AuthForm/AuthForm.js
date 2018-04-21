import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import styles from './auth.module.scss';
import withTranslation from '../../../withTranslation/withTranslation';

export const AuthForm = (props) => {
  const { onCLick, handleSubmit, pristine, submitting, children, translations } = props;

  return (
    <form
      className={styles.auth}
      onSubmit={handleSubmit(onCLick)}
    >
      <div className='form-group'>
        <label>{translations.login}</label>
        <Field
          className='form-control'
          component='input'
          name='login'
          type='text'
        />
      </div>

      <div className='form-group'>
        <label>{translations.password}</label>
        <Field
          className='form-control'
          component='input'
          name='password'
          type='password'
        />
      </div>

      {children}
      <div>
        <button
          className={styles.auth_btn}
          disabled={pristine || submitting}
          type='submit'
        >
          {translations.sendBtn}
        </button>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({ form: 'simple' }),
  withTranslation,
)(AuthForm);

AuthForm.propTypes = {
  onCLick: PropTypes.func,
  handleSubmit: PropTypes.func,
  children: PropTypes.element,
  translations: PropTypes.objectOf(PropTypes.string),
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};
