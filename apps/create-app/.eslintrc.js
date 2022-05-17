
const { dirname } = require('path');
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@nfts'],
  ignorePatterns: ['*.(test|spec).*', 'node_modules', 'dist', '.yarn'],
  parserOptions: {
    tsconfigRootDir: dirname(__filename)
  }
};