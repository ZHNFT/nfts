const { dirname } = require('path');

module.exports = {
  extends: ['@nfts/eslint-config'],
  parserOptions: {
    tsconfigRootDir: dirname(__filename)
  }
};
