import { SEARCH_BY_NAME, SORT_BY_LIKES, SORT_BY_RATING } from './types';

export const searchByName = (payload) => ({
  type: SEARCH_BY_NAME,
  payload,
});

export const sortByLikes = (payload) => ({
  type: SORT_BY_LIKES,
});

export const sortByRating = (payload) => ({
  type: SORT_BY_RATING,
});