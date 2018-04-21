import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Button} from './Button';

Enzyme.configure({ adapter: new Adapter() });

describe('>>> Button.js <<<', () => {
  it('render button', () => {
    const mockedFunc = jest.fn();

    const props = {
      className: 'btnClass',
      onClick: mockedFunc,
    }
    
    const tree = renderer
      .create(
        <Button  {...props} />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

  it('onClick function is called on click', () => {
    const mockedFunc = jest.fn();

    const tree = mount(
      <Button onClick={mockedFunc}/>
    );

    expect(mockedFunc.mock.calls.length).toBe(0);
    tree.find('button').simulate('click');
    expect(mockedFunc.mock.calls.length).toBe(1);
  });
});
