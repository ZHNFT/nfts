/**
 *
 * @type {Object}
 */
module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	ignorePatterns: ['*.d.ts'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			excludedFiles: ['*.test.ts', '*.test.tsx'],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
			parserOptions: {
				project: './tsconfig.json',
				ecmaVersion: 2018,
				sourceType: 'module'
			}
		}
	],
	rules: {}
};
