import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LogOut} from './LogOut';

Enzyme.configure({ adapter: new Adapter() });

describe('>>> LogOut.js <<<', () => {
  it('render button LogOut', () => {
    const mockedFunc = jest.fn();

    const props = {
      className: 'logOutClass',
      onClick: mockedFunc,
    }
    
    const tree = renderer
      .create(
        <LogOut  {...props} />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
  });
});
