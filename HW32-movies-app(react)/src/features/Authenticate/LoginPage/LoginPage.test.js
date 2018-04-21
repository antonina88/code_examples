import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import {LoginPage} from './LoginPage';
import configureStore from '../../../configureStore';

const store = configureStore();

describe('>>> LoginPage <<<', () => {
  it('renders LoginPage component correctly', () => {
    const mockedFunc = jest.fn();

    const props = {
      fetchUsers: mockedFunc,
      fetchSignIn: mockedFunc,
      isUserLoggedIn: null,
      translations: {
        close: "Close",
        authorizationPage: "Authorization page",
        doNotHaveAccount: "Don't have account",
        linkToRegister: "Go to Register page",
        passwordIsIncorrect: "Password is incorrect",
        userNotFound: "User not found, please try again",
        fieldsNotFilled: "Fields not filled"
      }
    }

    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <LoginPage {...props} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
