const path = require('path');

/**
 *
 * @returns {import("webpack").Configuration}
 */
module.exports = mode => {
  const isDev = mode === 'DEVELOPMENT';

  return {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.js',
    experiments: {
      outputModule: true
    },
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'ddd.js',
      libraryTarget: 'module'
    }
  };
};
