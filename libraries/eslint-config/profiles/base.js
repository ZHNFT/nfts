// @ts-check
/**
 *
 * @param scenario {'web' | 'node'}
 * @param overrides {function((import('eslint').Linter.Config)): import('eslint').Linter.Config}
 * @returns {import('eslint').Linter.Config}
 */
const eslintConfig = (scenario, overrides = (config) => config) => {
  /**
   *
   * @type {import('eslint').Linter.Config}
   */
  const baseConfig = {
    parserOptions: {
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module' // Allows for the use of imports
    },
    extends: ['eslint:recommended'],
    env: {
      node: true,
      jest: true,
      browser: true
    },
    overrides: [
      {
        files: '**/*.+(ts|tsx)',
        parser: '@typescript-eslint/parser',
        extends: ['plugin:@typescript-eslint/recommended']
      }
    ]
  };

  return overrides(baseConfig);
};

/**
 *
 * @type {function(("web"|"node"), function(import('eslint').Linter.Config): import('eslint').Linter.Config=): Linter.Config<Linter.RulesRecord>}
 */
module.exports = eslintConfig;
