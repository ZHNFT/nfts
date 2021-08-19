// @ts-check

const path = require('path');
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
      ecmaVersion: 2020,
      sourceType: 'module'
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
    ],
    ignorePatterns: ['./dist', './__tests__', './build', './config'].map(
      (folder) => path.resolve(__dirname, folder)
    )
  };

  return overrides(baseConfig);
};

/**
 *
 * @type {function(("web"|"node"), function(import('eslint').Linter.Config): import('eslint').Linter.Config=): Linter.Config<Linter.RulesRecord>}
 */
module.exports = eslintConfig;
