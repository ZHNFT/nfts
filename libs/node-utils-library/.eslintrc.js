const { dirname } = require("path");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@nfts"],
  ignorePatterns: ["test/**"],
  parserOptions: {
    tsconfigRootDir: dirname(__filename),
  },
};
