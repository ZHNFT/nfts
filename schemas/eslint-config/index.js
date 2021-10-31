/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	extends: ['./rules/node.js', './rules/web.js'].map(require.resolve),
	rules: {}
};
