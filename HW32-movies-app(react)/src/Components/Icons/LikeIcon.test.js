import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {LikeIcon} from './LikeIcon';

Enzyme.configure({ adapter: new Adapter() });

describe('>>> LikeIcon.js <<<', () => {
  it('render LikeIcon', () => {
    const mockedFunc = jest.fn();

    const props = {
      id: 1,
      addLike: mockedFunc,
    }
    
    const tree = renderer
      .create(
        <LikeIcon  {...props} />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

  it('addLike function is called on click', () => {
    const mockedFunc = jest.fn();

    const tree = mount(
      <LikeIcon addLike={mockedFunc}/>
    );

    expect(mockedFunc.mock.calls.length).toBe(0);
    tree.find('svg').simulate('click');
    expect(mockedFunc.mock.calls.length).toBe(1);
  });
});
