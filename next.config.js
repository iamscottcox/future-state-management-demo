const withLess = require('@zeit/next-less');

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  env: {
    PRIMARY_COLOUR: '#f1c40f',
    SECONDARY_COLOUR: '#f39c12i',
  },
});
