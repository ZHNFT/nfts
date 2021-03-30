module.exports = {
  rules: {
    "for-direction": ["error"], // nforce "for" loop update clause moving the counter in the right direction.
    "getter-return": ["error", { allowImplicit: true }], // enforce `return` statements in getters
    "no-async-promise-executor": ["error"], // disallow using an async function as a Promise executor
    "no-await-in-loop": ["error"], // disallow `await` inside of loops
    "no-compare-neg-zero": ["error"], // disallow comparing against -0
    "no-cond-assign": ["error", "always"], // disallow assignment operators in conditional expressions
    "no-console": ["warn"], // disallow the use of `console`
    "no-constant-condition": ["error"], // disallow constant expressions in conditions
    "no-control-regex": ["error"], // disallow control characters in regular expressions
    "no-debugger": ["error"], // disallow the use of `debugger`
    "no-dupe-args": ["error"], // disallow duplicate arguments in `function` definitions
    "no-dupe-else-if": "off", // disallow duplicate conditions in if-else-if chains
    "no-dupe-keys": ["error"], // disallow duplicate keys in object literals
    "no-duplicate-case": ["error"], // disallow duplicate case labels
    "no-empty": ["error"], // disallow empty block statements
    "no-empty-character-class": ["error"], // disallow empty character classes in regular expressions
    "no-ex-assign": ["error"], // disallow reassigning exceptions in `catch` clauses
    "no-extra-boolean-cast": ["error"], // disallow unnecessary boolean casts
    "no-extra-parens": [
      "off",
      "all",
      {
        conditionalAssign: true,
        nestedBinaryExpressions: false,
        returnAssign: false,
        ignoreJSX: "all", // elegate to eslint-plugin-react
        enforceForArrowConditionals: false,
      },
    ], // disallow unnecessary parentheses
    "no-extra-semi": "error", // disallow unnecessary semicolons
    "no-func-assign": ["error"], // disallow reassigning `function` declarations
    "no-import-assign": "off", // disallow assigning to imported bindings
    "no-inner-declarations": ["error"], // disallow variable or `function` declarations in nested blocks
    "no-invalid-regexp": ["error"], // disallow invalid regular expression strings in `RegExp` constructors
    "no-irregular-whitespace": ["error"], // disallow irregular whitespace
    "no-loss-of-precision": "off", // disallow literal numbers that lose precision
    "no-misleading-character-class": ["error"], // disallow characters which are made with multiple code points in character class syntax
    "no-obj-calls": ["error"], // disallow calling global object properties as functions
    "no-promise-executor-return": "off", // disallow returning values from Promise executor functions
    "no-prototype-builtins": ["error"], // disallow calling some `Object.prototype` methods directly on objects
    "no-regex-spaces": ["error"], // disallow multiple spaces in regular expressions
    "no-setter-return": "off", // disallow returning values from setters
    "no-sparse-arrays": ["error"], // disallow sparse arrays
    "no-template-curly-in-string": ["error"], // disallow template literal placeholder syntax in regular strings
    "no-unexpected-multiline": ["error"], // disallow confusing multiline expressions
    "no-unreachable": ["error"], // disallow unreachable code after `return`, `throw`, `continue`, and `break` statements
    "no-unreachable-loop": [
      "off",
      {
        ignore: [],
      },
    ], // disallow loops with a body that allows only one iteration
    "no-unsafe-finally": ["error"], // disallow control flow statements in `finally` blocks
    "no-unsafe-negation": ["error"], // disallow negating the left operand of relational operators
    "no-unsafe-optional-chaining": ["off", { disallowArithmeticOperators: true }], // disallow use of optional chaining in contexts where the `undefined` value is not allowed
    "no-useless-backreference": "off", // disallow useless backreferences in regular expressions
    "require-atomic-updates": "off", // disallow assignments that can lead to race conditions due to usage of `await` or `yield`
    "use-isnan": ["error"], // require calls to `isNaN()` when checking for `NaN`
    "valid-jsdoc": "off",
    "valid-typeof": ["error", { requireStringLiterals: true }], // enforce comparing `typeof` expressions against valid strings
  },
}
