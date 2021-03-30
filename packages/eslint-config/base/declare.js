module.exports = {
  rules: {
    "init-declarations": 0, // require or disallow initialization in variable declarations
    "no-delete-var": ["error"], // disallow deleting variables
    "no-label-var": ["error"], // disallow labels that share a name with a variable
    "no-restricted-globals": [
      "error",
      {
        name: "isFinite",
        message:
          "Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite",
      },
      {
        name: "isNaN",
        message:
          "Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan",
      },
    ], // disallow specified global variables
    "no-shadow": ["error"], // disallow variable declarations from shadowing variables declared in the outer scope
    "no-shadow-restricted-names": ["error"], // disallow identifiers from shadowing restricted names
    "no-undef": ["error"], // disallow the use of undeclared variables unless mentioned in `/*global */` comments
    "no-undef-init": ["error"], // disallow initializing variables to `undefined`
    "no-undefined": ["error"], // disallow the use of `undefined` as an identifier
    "no-unused-vars": ["error"], // disallow unused variables
    "no-use-before-define": ["warn", { functions: true, classes: true, variables: true }], // disallow the use of variables before they are defined
  },
}
