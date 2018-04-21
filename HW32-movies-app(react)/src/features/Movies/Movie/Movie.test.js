import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';

import configureStore from '../../../configureStore';
import {Movie} from './Movie';

Enzyme.configure({ adapter: new Adapter() });
const store = configureStore();

describe('>>> Movie.jsx <<<', () => {
    const mockedFunc = jest.fn();
    const movie = {
      "id": 1,
      "title": "The Shawshank Redemptoin",
      "posterUrl":"some url",
      "stars": 2,
      "likes": 22,
      "genres": ["Crime", "Drama"],
      "actorsIds": [0, 1, 2],
      "director": "Frank Darabont",
      "description": "Lorem ipsum..."
    };

    const props = {
      addLike: mockedFunc,
      changeRating: mockedFunc,
      removeLike: mockedFunc,
      movie: movie,
    }

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Movie {...props} />
        </MemoryRouter>
      </Provider>
    );

    it('renders movie correctly', () => {
      expect(wrapper.find(Movie)).toHaveLength(1);
    });

    it('should contain likes container', () => {
      expect(wrapper.find('.likes').length).toBe(1);
    });
});
