module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ["@initializer/eslint-config", "prettier"],
  overrides: [
    {
      files: ["**/*.ts"],
      extends: ["@initializer/eslint-config/typescript"],
    },
  ],
  ignorePatterns: ["**/dist/"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["prettier"],
  rules: {
    "no-plusplus": "off",
  },
};
