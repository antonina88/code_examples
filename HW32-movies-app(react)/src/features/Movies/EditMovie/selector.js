export const getEditMovie = (state, ownProps) => {
  return state.movies.movies.find(movie => String(movie.id) === ownProps.match.params.id);
};
