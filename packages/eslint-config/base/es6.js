/**
@NOTE es6 relative, dont't modify this file directly,
using "overrides" field for customize.
* */

module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      generators: false,
      objectLiteralDuplicateProperties: false,
    },
  },
  rules: {
    "arrow-body-style": ["error", "always"], // require braces around arrow function bodies
    "arrow-parens": [
      "error",
      "as-needed",
      {
        requireForBlockBody: true,
      },
    ], // require parentheses around arrow function arguments
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true, // add spacing before and after.
      },
    ], // enforce consistent spacing before and after the arrow in arrow functions
    "constructor-super": "error", // require `super()` calls in constructors
    "generator-star-spacing": ["warn", "before"], // enforce consistent spacing around `*` operators in generator functions
    "no-class-assign": ["error"], // disallow reassigning class members
    "no-confusing-arrow": ["error", { allowParens: true }], // disallow arrow functions where they could be confused with comparisons
    "no-const-assign": ["error"], // disallow reassigning `const` variables
    "no-dupe-class-members": ["error"], // disallow duplicate class members
    "no-duplicate-imports": ["error"], // disallow duplicate module imports
    "no-new-symbol": ["error"], // disallow `new` operators with the `Symbol` object
    "no-restricted-exports": [
      "error",
      {
        restrictedNamedExports: [],
      },
    ], // disallow specified names in exports
    "no-restricted-imports": [
      "error",
      {
        paths: [], // @example ["import1", "import2"]
        patterns: [], // @example ["import1/*"]
      },
    ], // disallow specified modules when loaded by `import`
    "no-this-before-super": ["error"], // disallow `this`/`super` before calling `super()` in constructors
    "no-useless-computed-key": [
      "error",
      {
        enforceForClassMembers: true,
      },
    ], // disallow unnecessary computed property keys in objects and classes
    "no-useless-constructor": ["error"], // disallow unnecessary constructors
    "no-useless-rename": ["error"], // disallow renaming import, export, and destructured assignments to the same name
    "no-var": ["error"], // require `let` or `const` instead of `var`
    "object-shorthand": [
      "error",
      "always",
      {
        avoidQuotes: true,
        avoidExplicitReturnArrows: true,
        ignoreConstructors: false,
      },
    ], // require or disallow method and property shorthand syntax for object literals
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: true,
        allowUnboundThis: true,
      },
    ], // require using arrow functions for callbacks
    "prefer-const": [
      "error",
      {
        ignoreReadBeforeAssign: true,
      },
    ], // require `const` declarations for variables that are never reassigned after declared
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ], // require destructuring from arrays and/or objects
    "prefer-numeric-literals": ["error"], // disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals
    "prefer-rest-params": 0, // require rest parameters instead of `arguments`
    "prefer-spread": 0, // require spread operators instead of `.apply()`
    "prefer-template": ["warn"], // require template literals instead of string concatenation
    "require-yield": ["error"], // require generator functions to contain `yield`
    "rest-spread-spacing": ["error", "never"], // enforce spacing between rest and spread operators and their expressions
    "sort-imports": [
      "off",
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false,
      },
    ], // enforce sorted import declarations within modules
    "symbol-description": ["error"], // require symbol descriptions
    "template-curly-spacing": ["error", "never"], // require or disallow spacing around embedded expressions of template strings
    "yield-star-spacing": ["error", "before"], // require or disallow spacing around the `*` in `yield*` expressions
  },
};
