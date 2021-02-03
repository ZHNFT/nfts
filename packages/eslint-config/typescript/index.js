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
  },
};
