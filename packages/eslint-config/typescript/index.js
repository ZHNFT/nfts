module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    // @fixme This rule will cause a eslint-plugin internal error
    // can not read property "0"
    "@typescript-eslint/unbound-method": "off",
    // @note You must disable the base rule as it can report incorrect errors
    // "no-extra-semi": "off" @see ../base/errors.js row-32
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": "error",
  },
};
