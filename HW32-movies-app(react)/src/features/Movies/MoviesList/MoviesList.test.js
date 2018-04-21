import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import {MoviesList} from './MoviesList';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../Movie/Movie', () => {
  return 'Movie';
});

describe('>>> MoviesList.js <<<', () => {
  it('check download movies', () => {
    const mockedFunc = jest.fn();

    const props = {
      movies: [],
      addLike: mockedFunc,
      removeLike: mockedFunc,
      changeRating: mockedFunc,
      receiveMovies: mockedFunc,
      receiveActors: mockedFunc
    }

    const tree = renderer
      .create(
        <MemoryRouter>
          <MoviesList {...props} />
        </MemoryRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot(); 
    expect(props.receiveMovies).toHaveBeenCalled();
    expect(props.receiveActors).toHaveBeenCalled();
  });

  it('renders movieslist', () => {
    const mockedFunc = jest.fn();

    const movies = [{
      "id": 1,
      "title": "The Shawshank Redemptoin",
      "posterUrl":"some url",
      "stars": 2,
      "likes": 22,
      "genres": ["Crime", "Drama"],
      "actorsIds": [0, 1, 2],
      "director": "Frank Darabont",
      "description": "Lorem ipsum..."
    }];

    const props = {
      movies: [...movies],
      receiveMovies: mockedFunc,
      receiveActors: mockedFunc
    }

    const tree = renderer
      .create(
        <MoviesList {...props}/>
      )
      .toJSON();

      expect(tree).toMatchSnapshot(); 
  });
});
