/**  @type {import('@types/eslint').Linter.Config} */
module.exports = {
  plugins: ['react', 'hooks'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {}
    }
  ]
};
