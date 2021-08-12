// @ts-check
/**
 *
 * @param scenario {'node' | 'web'}
 * @return {object}
 */
const _buildConfig = (scenario) => {
  return {
    root: true,
    parser: '',
    ignorePatterns: ['*.d.ts', '**/dist/**'],
    plugins: ['@typescript-eslint/eslint-plugin'],
    env: {
      node: true,
      browser: true
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          tsconfigRootDir: __dirname
        },
        extends: [
          'plugin:@typescript-eslint/recommended',
          ///enable type checking
          'plugin:@typescript-eslint/recommended-requiring-type-checking'
        ],
        rules: {}
      }
    ]
  };
};

module.exports = _buildConfig;
