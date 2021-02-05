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
        // @FIXME Conflict with eslint semi rule
        // https://github.com/typescript-eslint/typescript-eslint/blob/v4.14.2/packages/eslint-plugin/docs/rules/no-extra-semi.md
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
