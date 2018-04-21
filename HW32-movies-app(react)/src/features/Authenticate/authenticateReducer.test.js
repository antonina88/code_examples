import userReducer, { initialState } from './authenticateReducer';

import { registrationUser, authorizationUser, logOut } from './authenticateActions';

const user = {
	name: 'user',
	password: 'sgN5kl'
}

describe('>>> USER REDUCER <<<', () => {
	it('should handle initial state user', () => {
    expect(
      userReducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should register user', () => {
  	const expectedStore = {
      ...initialState,
      userAuthorized: {
	      ...user
	    },
    }

    expect(
      userReducer(initialState, registrationUser(user))
    ).toEqual(expectedStore);
  });

 	it('should log in user', () => {
  	const expectedStore = {
      ...initialState,
      userAuthorized: {
	      ...user
	    },
    }

    expect(
      userReducer(initialState, authorizationUser(user))
    ).toEqual(expectedStore);
  });

  it('should log out user', () => {
  	const preparedStore = {
      ...initialState,
      userAuthorized: {
	      ...user
	    },
    }

    const expectedStore = {
      ...initialState
    };

    expect(
      userReducer(preparedStore, logOut(user))
    ).toEqual(expectedStore);
  });
});
