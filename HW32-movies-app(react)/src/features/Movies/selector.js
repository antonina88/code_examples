export const getMovies = (state) => {
  const { movies } = state.movies;
  const { sortByLike, sortByRating, searchQuery } = state.filter;
  let filteredMovies = sortByLike
    ? [...movies].sort((a,b) => b.likes - a.likes)
    : sortByRating
      ? [...movies].sort((a,b) => b.stars - a.stars)
      : movies;

  filteredMovies = searchQuery
    ? filteredMovies.filter(movie => (
      movie.title.toLowerCase().includes(searchQuery)
    ))
    : filteredMovies;

  return filteredMovies;
};

export const getMovieDetails = (state, ownProps) => {
  return state.movies.movies.find(movie => String(movie.id) === ownProps.match.params.id);
};
export const getActors = (state) => state.movies.actors;
