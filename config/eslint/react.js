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
      files: ['*.scripts', '*.tsx'],
      rules: {}
    }
  ]
};
