import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('check authenticate requests', () => {
  it('returns data when fetchUsers is called', () => {
    const mock = new MockAdapter(axios);

    const users = [{
      id: 1,
      name: "Sara",
      pasword:"jgncm5%d",
    }];

    mock.onGet('/users').reply(200, users);

    axios.get('/users')
      .then(function(response) {
        expect(response.data).toEqual(users);
    });
  });

  it('check adding new user', () => {
    const mock = new MockAdapter(axios);

    const newUser = {
      name: "Sara",
      pasword:"jgncm5%d"
    }

    mock.onPost('/users', { name: "Sara", pasword: "jgncm5%d"})
      .reply(200, newUser);

    axios.post('/users', { name: "Sara", pasword: "jgncm5%d"})
      .then(function(response) {
        expect(response.data).toEqual(newUser);
        expect(response.status).toEqual(200);
    });
  });
});
