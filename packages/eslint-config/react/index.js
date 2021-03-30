module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  extends: ["./rules", "./hooks", "./jsx"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".json"],
      },
    },
    react: {
      pragma: "React",
      version: "detect",
    },
    propWrapperFunctions: [
      "forbidExtraProps", // https://www.npmjs.com/package/airbnb-prop-types
      "exact", // https://www.npmjs.com/package/prop-types-exact
      "Object.freeze", // https://tc39.github.io/ecma262/#sec-object.freeze
    ],
  },
  rules: {},
}
