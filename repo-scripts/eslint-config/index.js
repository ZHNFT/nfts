/**
 *
 * @type {import('eslint')}
 */
module.exports = {
  extends: ['eslint:recommended'],
  ignorePatterns: ['*.d.ts'],
  env: { node: true, jest: true },
  overrides: [
    {
      files: ['src/*.ts', 'src/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
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
