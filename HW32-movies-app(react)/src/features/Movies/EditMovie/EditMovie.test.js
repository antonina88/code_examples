import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from '../../../configureStore';
import {EditMovie} from './EditMovie';

const store = configureStore();

describe('>>> EditMovie.jsx <<<', () => {
  it('renders editMovie correctly', () => {
    const mockedFunc = jest.fn();

    const movie = {
      id: 1,
      title: "The Shawshank Redemptoin",
      posterUrl:"some url",
      stars: 2,
      likes: 22,
      genres: ["Crime", "Drama"],
      actorsIds: [0, 1, 2],
      director: "Frank Darabont",
      description: "Lorem ipsum..."
    };

    const props = {
      updateMovie: mockedFunc,
      movie: {...movie},
      translations: {
        movieTitle: "some text",
        imgUrl: "some text",
        director: "some text",
        genres: "some text",
        description: "some text",
        saveBtn: "some text"
      }
    }

    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <EditMovie {...props} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
