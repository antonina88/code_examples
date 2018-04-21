import {
  GET_MOVIES,
  ADD_LIKE,
  REMOVE_LIKE,
  CHANGE_RATING,
  EDIT_MOVIE,
  RECEIVE_ACTORS,
  REMOVE_MOVIE,
} from './types';

export const initialState = {
  movies: [],
  actors: [],
};

export default function moviesReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };

    case ADD_LIKE:
      return {
        ...state,
        movies: state.movies.map(movie => {
          return movie.id === action.payload
            ? { ...movie, likes: movie.likes + 1 }
            : movie;
        }),
      };

    case REMOVE_LIKE:
      return {
        ...state,
        movies: state.movies.map(movie => {
          const updatedMovie = movie.likes === 0
            ? movie
            : { ...movie, likes: movie.likes - 1 };

          return movie.id === action.payload
            ? updatedMovie
            : movie;
        }),
      };

    case CHANGE_RATING:
      return {
        ...state,
        movies: state.movies.map(movie => {
          return movie.id === action.id
            ? { ...movie, stars: action.value }
            : movie;
        }),
      };

    case EDIT_MOVIE:
      return {
        ...state,
        movies: state.movies.map(movie => movie.id === action.payload.id
          ? action.payload
          : movie
        ),
      };

    case RECEIVE_ACTORS:
      return {
        ...state,
        actors: action.payload,
      };

    case REMOVE_MOVIE:
      return {
        ...state,
        movies: removeMovie(state, action),
      };

    default:
      return state;
  }
}

function removeMovie(state, action) {
  const _index = state.movies.findIndex(movie => movie.id === action.payload);

  return [
    ...state.movies.slice(0, _index),
    ...state.movies.slice(_index + 1),
  ];
}
