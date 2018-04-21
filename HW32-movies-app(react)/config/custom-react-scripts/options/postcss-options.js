'use strict';

module.exports = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    require('postcss-cssnext'),
    require('postcss-custom-properties'),
    require('postcss-import'),
  ],
};
