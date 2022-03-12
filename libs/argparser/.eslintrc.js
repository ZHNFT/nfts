const { dirname } = require('path');

module.exports = {
  extends: ['@ntfs'],
  parserOptions: {
    tsconfigRootDir: dirname(__filename)
  }
};
