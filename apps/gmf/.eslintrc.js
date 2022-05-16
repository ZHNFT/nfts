const { dirname } = require("path");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@nfts"],
  ignorePatterns: ["/dist/*.js"],
  parserOptions: {
    tsconfigRootDir: dirname(__filename),
  },
};
