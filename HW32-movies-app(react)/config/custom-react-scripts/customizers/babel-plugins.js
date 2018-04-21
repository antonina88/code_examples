module.exports = {
  DECORATORS: {
    get: () => require.resolve('babel-plugin-transform-decorators-legacy'),
  },
  STYLED: {
    get: () =>
      require.resolve('babel-plugin-styled-components', {
        displayName: true,
      }),
  },
};
