import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  LOG_OUT,
} from './types';

export const registrationUser = (payload) => ({
  type: SIGN_UP_USER,
  payload,
});

export const authorizationUser = (payload) => ({
  type: SIGN_IN_USER,
  payload,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const fetchUsers = () => {
  return (dispatch, state, api) => {
    return api('users')
      .then(response => response.data);
  };
};

export const fetchSignIn = (id) => {
  return (dispatch, state, api) => {
    api(`users/${id}`)
      .then(response => {
        dispatch(authorizationUser(response.data));
      });
  };
};

export const fetchSignUp = (body) => {
  return (dispatch, state, api) => {
    api('users', 'post', body, { 'Content-Type': 'application/json' })
      .then(response => {
        dispatch(registrationUser(response.data));
      });
  };
};