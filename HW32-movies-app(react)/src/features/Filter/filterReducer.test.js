import filter, { initialState } from './filterReducer';
import { searchByName, sortByLikes, sortByRating } from './filterActions';
 
describe('>>> FILTER REDUCER <<<', () => {
  it('should handle initial state', () => {
    expect(
      filter(undefined, {})
    ).toEqual(initialState);
  });

  it('should search movies by input value', () => {
    const expectedStore = {
      searchQuery: 'someFilm',
      sortByLike: false,
      sortByRating: false,
    };

    expect(
      filter(initialState, searchByName('someFilm'))
    ).toEqual(expectedStore);
  });

  it('should sort movies by likes', () => {
    const expectedStore = {
      searchQuery: '',
      sortByLike: true,
      sortByRating: false,
    };

    expect(
      filter(initialState, sortByLikes())
    ).toEqual(expectedStore);
  });

  it('should sort movies by rating', () => {
    const expectedStore = {
      searchQuery: '',
      sortByLike: false,
      sortByRating: true,
    };

    expect(
      filter(initialState, sortByRating())
    ).toEqual(expectedStore);
  });
});