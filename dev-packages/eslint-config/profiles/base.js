/**
 *
 * @param scenario
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
          /**
           * type checking
           */
          'plugin:@typescript-eslint/recommended-requiring-type-checking'
        ],
        rules: {}
      }
    ]
    /// 指定这两个字段来限制@typescript-eslint/parser处理的文件数量
    /// 可以一定程度上提升eslint的性能。
    ////////////////////////
    // include: [],
    // exclude: []
    ////////////////////////
  };
};

module.exports = _buildConfig;
