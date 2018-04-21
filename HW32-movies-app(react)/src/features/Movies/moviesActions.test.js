import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('send request to get movies', () => {
  it('returns data when fetchMovies is called', done => {
    const mock = new MockAdapter(axios);

    const movies = [{
      "id": 1,
      "title": "The Shawshank Redemptoin",
      "posterUrl":"some url",
      "stars": 2,
      "likes": 22,
      "genres": ["Crime", "Drama"],
      "actorsIds": [0, 1, 2],
      "director": "Frank Darabont",
      "description": "Lorem ipsum..."
    }];

    mock.onGet('/movies').reply(200, movies);

    axios.get('/movies')
      .then(function(response) {
        expect(response.data).toEqual(movies);
        done();
      });
  });

  it('update likes when fetchAddLike is called', done => {
    const mock = new MockAdapter(axios);

    const updateMovie=[{
      "id": 1,
      "title": "The Shawshank Redemptoin",
      "posterUrl":"some url",
      "stars": 2,
      "likes": 23,
      "genres": ["Crime", "Drama"],
      "actorsIds": [0, 1, 2],
      "director": "Frank Darabont",
      "description": "Lorem ipsum..."
    }];

    mock.onPatch('/movies/1').reply(200, updateMovie);

    axios.patch('/movies/1')
      .then(function(response) {
        expect(response.data).toEqual(updateMovie);
        done();
      });
  });
});