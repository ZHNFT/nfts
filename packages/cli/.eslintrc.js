const path = require("path");

const PROJECT = path.resolve(__dirname, "tsconfig.json");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  // "extends": ["@initializer/eslint-config"],
  ignorePatterns: ["./dist"],
  extends: ["@initializer/eslint-config"],
  overrides: [
    {
      files: ["src/**/*.ts"],
      parserOptions: {
        project: [PROJECT],
      },
      extends: ["@initializer/eslint-config/typescript"],
    },
  ],
  rules: {},
};
