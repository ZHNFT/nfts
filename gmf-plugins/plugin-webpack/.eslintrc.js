const { dirname } = require("path");

module.exports = {
  extends: ["@nfts"],
  parserOptions: {
    tsconfigRootDir: dirname(__filename),
  },
};
