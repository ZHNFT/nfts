// @ts-check

const eslintConfig = require('./base');

/**
 * @type {import('eslint').Linter.Config<import('eslint').Linter.RulesRecord>}
 */
module.exports = eslintConfig('web', (config) => {
  return {
    ...config,
    rules: {}
  };
});
