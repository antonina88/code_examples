import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {DislikeIcon} from './DislikeIcon';

Enzyme.configure({ adapter: new Adapter() });

describe('>>> DislikeIcon.js <<<', () => {
  it('render LikeIcon', () => {
    const mockedFunc = jest.fn();

    const props = {
      id: 1,
      removeLike: mockedFunc,
    }
    
    const tree = renderer
      .create(
        <DislikeIcon  {...props} />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

  it('removeLike function is called on click', () => {
    const mockedFunc = jest.fn();

    const tree = mount(
      <DislikeIcon removeLike={mockedFunc}/>
    );

    expect(mockedFunc.mock.calls.length).toBe(0);
    tree.find('svg').simulate('click');
    expect(mockedFunc.mock.calls.length).toBe(1);
  });
});