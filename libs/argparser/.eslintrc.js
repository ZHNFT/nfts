const { dirname } = require('path');

module.exports = {
  extends: ['@ntfs/eslint-config'],
  parserOptions: {
    tsconfigRootDir: dirname(__filename)
  }
};
