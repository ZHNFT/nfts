const path = require("path");

const PROJECT = path.resolve(__dirname, "tsconfig.json");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["@initializer/eslint-config"],
  ignorePatterns: ["**/dist"],
  overrides: [
    {
      files: ["src/**/*.ts"],
      parserOptions: {
        project: [PROJECT],
      },
      extends: ["@initializer/eslint-config/typescript"],
      rules: {
        // @fixme Conflict with eslint semi rule
        "@typescript-eslint/no-extra-semi": 0,
      },
    },
  ],
  // @FIXME Conflict with Prettier
  rules: {
    "no-tabs": 0,
    indent: 0,
    semi: 0,
  },
};
