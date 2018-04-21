import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Input} from './Input';

Enzyme.configure({ adapter: new Adapter() });

describe('>>> Input.js <<<', () => {
  it('render input', () => {
    const mockedFunc = jest.fn();

    const props = {
      className: 'inputClass',
      onChange: mockedFunc,
    }
    
    const tree = renderer
      .create(
        <Input  {...props} />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

  it('onChange function is called on input change', () => {
    const mockedFunc = jest.fn();
    
    const tree = mount(
      <Input onChange={mockedFunc}/>
    );

    expect(mockedFunc.mock.calls.length).toBe(0);
    tree.find('input').simulate('change');
    expect(mockedFunc.mock.calls.length).toBe(1);
  });
});
