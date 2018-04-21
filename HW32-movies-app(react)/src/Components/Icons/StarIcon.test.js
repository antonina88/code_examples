import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {StarIcon} from './StarIcon';

Enzyme.configure({ adapter: new Adapter() });

describe('>>> StarIcon.js <<<', () => {
  it('render Stars', () => {
    const mockedFunc = jest.fn();

    const props = {
      isActiveClass: 'active',
      changeRating: mockedFunc,
      value: 3,
    }
    
    const tree = renderer
      .create(
        <StarIcon  {...props} />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

  it('changeRating function is called on click', () => {
    const mockedFunc = jest.fn();

    const tree = mount(
      <StarIcon changeRating={mockedFunc}/>
    );

    expect(mockedFunc.mock.calls.length).toBe(0);
    tree.find('svg').simulate('click');
    expect(mockedFunc.mock.calls.length).toBe(1);
  });
});
