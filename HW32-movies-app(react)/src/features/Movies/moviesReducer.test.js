import moviesReducer, { initialState } from './moviesReducer';

import { 
  receiveMovies, 
  addLike, 
  removeLike, 
  changeRating, 
  receiveActors,
  removeMovie
} from './moviesActions';

const movies = [{
  id: 1,
  title: "The Shawshank Redemptoin",
  posterUrl:"some url",
  stars: 2,
  likes: 22,
  genres: ["Crime", "Drama"],
  actorsIds: [0, 1, 2],
  director: "Frank Darabont",
  description: "Lorem ipsum..."
}];

const actors = [{
  id: 13,
  name: "Martin Balsam",
  imgUrl: "some url",
  biography: "Lorem ipsum dolor sit amet"
}];

describe('>>> MOVIES REDUCER <<<', () => {
  it('should handle initial state', () => {
    expect(
      moviesReducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle RECEIVE MOVIES', () => {
    const expectedStore = {
      ...initialState,
      movies
    };

    expect(
      moviesReducer(initialState, receiveMovies(movies))
    ).toEqual(expectedStore);
  });

  it('should handle REMOVE MOVIE', () => {
    const preparedStore = {
      ...initialState,
      movies: [...movies],
    }

    const expectedStore = {
      ...initialState
    };

    const movieId = 1;

    expect(
      moviesReducer(preparedStore, removeMovie(movieId))
    ).toEqual(expectedStore);
  });

  it('should handle RECEIVE ACTORS', () => {
    const expectedStore = {
      ...initialState,
      actors
    };

    expect(
      moviesReducer(initialState, receiveActors(actors))
    ).toEqual(expectedStore);
  });

  it('should handle ADD LIKE', () => {
    const preparedStore = {
      ...initialState,
      movies: [...movies],
    }
      
    const expectedStore = {
      ...initialState,
      movies: [{
        id: 1,
        title: "The Shawshank Redemptoin",
        posterUrl:"some url",
        stars: 2,
        likes: 23,
        genres: ["Crime", "Drama"],
        actorsIds: [0, 1, 2],
        director: "Frank Darabont",
        description: "Lorem ipsum..."
      }]
    };

    const movieId = 1;

    expect(
      moviesReducer(preparedStore, addLike(movieId))
    ).toEqual(expectedStore);
  });

  it('should handle REMOVE LIKE', () => {
    const preparedStore = {
      ...initialState,
      movies: [...movies],
    }
      
    const expectedStore = {
      ...initialState,
      movies: [{
        id: 1,
        title: "The Shawshank Redemptoin",
        posterUrl:"some url",
        stars: 2,
        likes: 21,
        genres: ["Crime", "Drama"],
        actorsIds: [0, 1, 2],
        director: "Frank Darabont",
        description: "Lorem ipsum..."
      }]
    };

    const movieId = 1;

    expect(
      moviesReducer(preparedStore, removeLike(movieId))
    ).toEqual(expectedStore);
  });

  it('should handle CHANGE RATING', () => {
    const preparedStore = {
      ...initialState,
      movies: [...movies],
    }
      
    const expectedStore = {
      ...initialState,
      movies: [{
        id: 1,
        title: "The Shawshank Redemptoin",
        posterUrl:"some url",
        stars: 5,
        likes: 22,
        genres: ["Crime", "Drama"],
        actorsIds: [0, 1, 2],
        director: "Frank Darabont",
        description: "Lorem ipsum..."
      }]
    };

    const movieId = 1;
    const valueRating = 5;

    expect(
       moviesReducer(preparedStore, changeRating(movieId, valueRating))
    ).toEqual(expectedStore);
  });
});
