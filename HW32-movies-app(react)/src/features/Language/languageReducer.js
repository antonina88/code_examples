import { CHANGE_LANGUAGE } from './types';

const initialState = {
  language: 'ru',
};

export default function userReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
}
