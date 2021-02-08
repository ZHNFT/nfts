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
      rules: {
        // "@typescript-eslint/no-unsafe-return": "off",
        // @fixme sShould we keep this
        "@typescript-eslint/restrict-template-expressions": [
          "off",
          {
            allowNumber: true,
            allowBoolean: false,
            allowAny: false,
            allowNullish: false,
          },
        ],
      },
    },
  ],
  ignorePatterns: ["**/dist/"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["prettier"],
  rules: {
    "no-plusplus": "off",
    // @NOTE Remember async this change to `eslint-config`
    "arrow-body-style": ["error", "as-needed"],
  },
};
