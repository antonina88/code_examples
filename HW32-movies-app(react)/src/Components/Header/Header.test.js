import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Header } from './Header';

Enzyme.configure({ adapter: new Adapter() });

describe('>>> Header.jsx <<<', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(wrapper.find(Header)).toHaveLength(1);
  });
});