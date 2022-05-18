/**  @type {import('@types/eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  ignorePatterns: ["*.d.ts"],
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  parser: "",
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2018,
        sourceType: "module",
      },
    },
  ],
  rules: {},
};
