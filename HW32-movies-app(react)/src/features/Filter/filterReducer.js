import { SEARCH_BY_NAME, SORT_BY_LIKES, SORT_BY_RATING } from './types';

export const initialState = {
  searchQuery: '',
  sortByLike: false,
  sortByRating: false,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BY_NAME:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case SORT_BY_LIKES:
      return {
        ...state,
        sortByLike: true,
        sortByRating: false,
      };

    case SORT_BY_RATING:
      return {
        ...state,
        sortByLike: false,
        sortByRating: true,
      };

    default:
      return state;
  }
}
