const { dirname } = require('path');

module.exports = {
  extends: ['@nfts'],
  ignorePatterns: ['test/'],
  parserOptions: {
    tsconfigRootDir: dirname(__filename)
  }
};
