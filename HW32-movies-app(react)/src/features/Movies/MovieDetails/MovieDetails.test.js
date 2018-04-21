import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import {Provider} from 'react-redux';

import configureStore from '../../../configureStore';
import {MovieDetails} from './MovieDetails';

Enzyme.configure({ adapter: new Adapter() });
const store = configureStore();

describe('>>> MovieDetails.js <<<', () => {
  it('renders MovieDetails correctly', () => {
    const mockedFunc = jest.fn();

    const props = {
      movie: {
        id: 1,
        title: "The Shawshank Redemptoin",
        posterUrl:"some url",
        stars: 2,
        likes: 22,
        genres: ["Crime", "Drama"],
        actorsIds: [2],
        director: "Frank Darabont",
        description: "Lorem ipsum..."
      },
      actors: [{
        id: 2,
        name: "Martin Balsam",
        imgUrl: "some url",
        biography: "Lorem ipsum dolor sit amet"
      }],
      translations: {
        edit: "edit",
        actors: "Actors",
        delete: "delete movie",
        homeLink: "Home page",
        logOut: "LogOut",
        imgUrl: "Image url",
        movieTitle: "Movie title",
        director: "Director",
        genres: "Genres",
        description: "Description"
      },
      addLike: mockedFunc,
      removeLike: mockedFunc,
      changeRating: mockedFunc
    }
 
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <MovieDetails {...props} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('MovieDetails component', () => {
      const wrapper = shallow(
        <MemoryRouter>
          <MovieDetails />
        </MemoryRouter>
      );
      
      expect(wrapper.find(MovieDetails)).toHaveLength(1);
    });
});
