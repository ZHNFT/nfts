/**  @type {import('@types/eslint').Linter.Config} */
module.exports = {
  extends: ["eslint:recommended"],
  ignorePatterns: ["*.d.ts"],
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  settings: {
    react: { version: "detect" },
  },
  overrides: [
    {
      files: ["*.[jt]sx?"],
      plugins: ["react", "hooks"],
      rules: {},
    },
  ],
};
