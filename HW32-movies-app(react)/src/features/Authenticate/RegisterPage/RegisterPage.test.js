import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import {RegisterPage} from './RegisterPage';
import configureStore from '../../../configureStore';

const store = configureStore();

describe('>>> RegisterPage <<<', () => {
  it('renders RegisterPage component correctly', () => {
    const mockedFunc = jest.fn();

    const props = {
      fetchUsers: mockedFunc,
      fetchSignUp: mockedFunc,
      isUserLoggedIn: null,
      translations: {
        fieldsNotFilled: "Fields not filled",
        userAlreadyExists: "User with such login already exists",
        registrationPage: "Registration page",
        alreadyHaveAnAccount: "Already have an account",
        linkToLogin:  "Go to Login page",
        close: "Close"
      }
    }

    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <RegisterPage {...props} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
