// @ts-check

const { findConfigFile, readJsonConfigFile } = require('typescript');

const defaultTsConfig = require.resolve(
  '@raydium/shared-config/config/tsconfig.base.json'
);

const execRoot = process.cwd();

const tsConfigName = findConfigFile(
  execRoot,
  (fileName) => {
    if (fileName === 'tsconfig.json') {
      return true;
    }
  },
  'tsconfig.json'
);
