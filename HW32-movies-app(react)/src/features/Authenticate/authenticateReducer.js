import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  LOG_OUT,
} from './types';

export const initialState = {
  userAuthorized: null,
};

export default function userReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SIGN_UP_USER:
      return {
        ...state,
        userAuthorized: action.payload,
      };

    case SIGN_IN_USER:
      return {
        ...state,
        userAuthorized: action.payload,
      };

    case LOG_OUT:
      return {
        ...state,
        userAuthorized: null,
      };

    default:
      return state;
  }
}
