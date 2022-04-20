const { dirname } = require('path');

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  extends: ['@nfts'],
  parserOptions: {
    tsconfigRootDir: dirname(__filename)
  }
};
