import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import {Actor} from './Actor';
import configureStore from '../../configureStore';

const store = configureStore();

describe('>>> Actor <<<', () => {
    it('renders Actor component correctly', () => {
      const props = {
        actor:     {
          "id": 24,
          "name": "Eli Wallach",
          "imgUrl": "some url",
          "biography": "Lorem ipsum dolor sit amet"
        },
        translations: {
          "name": "Name",
          "biography": "Biography",     
        }
      }
      
      const tree = renderer
        .create(
          <Provider store={store}>
            <MemoryRouter>
              <Actor {...props} />
            </MemoryRouter>
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
});
