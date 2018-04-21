import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Filter} from './Filter';
import configureStore from '../../configureStore';

const store = configureStore();
Enzyme.configure({ adapter: new Adapter() });

describe('>>> Filter <<<', () => {
  it('renders Filter component correctly', () => {
    const mockedFunc = jest.fn();

    const props = {
      actor: {
        "id": 24,
        "name": "Eli Wallach",
        "imgUrl": "some url",
        "biography": "Lorem ipsum dolor sit amet"
      },
      translations: {
        "sortByRating": "Sort by rating",
        "sortByLikes": "Sort by likes",
        "search": "Search"
      },
      sortByLikes: mockedFunc,
      sortByRating: mockedFunc,
      searchByName: mockedFunc
    }

    const tree = renderer
      .create(
        <Provider store={store}>
          <Filter {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
