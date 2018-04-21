import { combineReducers } from 'redux';
import movies from './features/Movies/moviesReducer';
import filter from './features/Filter/filterReducer';
import authenticate from './features/Authenticate/authenticateReducer';
import { reducer as form } from 'redux-form';
import language from './features/Language/languageReducer';

export default combineReducers({
  movies,
  filter,
  authenticate,
  form,
  language,
});
