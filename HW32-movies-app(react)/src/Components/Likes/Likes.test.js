import React from 'react';
import renderer from 'react-test-renderer';

import { MemoryRouter } from 'react-router-dom';
import {Likes} from './Likes';

describe('>>> Likes.js <<<', () => {
  it('render likes', () => {
    const mockedFunc = jest.fn();

    const props = {
      id: 2,
      addLike: mockedFunc,
      removeLike: mockedFunc,
      countLikes: 12,
      translations: {likes: "Likes"}
    }
    
    const tree = renderer
      .create(
        <MemoryRouter>
          <Likes  {...props} />
        </MemoryRouter>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
  });
});
