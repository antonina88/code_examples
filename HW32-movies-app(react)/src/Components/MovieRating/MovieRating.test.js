import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MovieRating} from './MovieRating';

Enzyme.configure({ adapter: new Adapter() });

describe('>>> MovieRating.js <<<', () => {
  it('render component MovieRating', () => {
    const mockedFunc = jest.fn();

    const props = {
      movieStars: 3,
      changeRating: mockedFunc,
    }
    
    const tree = renderer
      .create(
        <MovieRating  {...props} />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
  });
});
