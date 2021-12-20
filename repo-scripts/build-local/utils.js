const { log } = require('console');
const { join } = require('path');
const fs = require('fs');
const {
  createProgram,
  flattenDiagnosticMessageText,
  parseConfigFileTextToJson,
  getLineAndCharacterOfPosition,
  getPreEmitDiagnostics
} = require('typescript');

const { NTFS_DEFAULT_CONFIG_PATH } = require('./constants');

/**
 *
 * @returns any
 */
const _findConfigFile = () => {
  const tsConfigFilePath = join(NTFS_DEFAULT_CONFIG_PATH, 'tsconfig.json');

  const { config, error } = parseConfigFileTextToJson(
    tsConfigFilePath,
    fs.readFileSync(tsConfigFilePath, { encoding: 'utf-8' }).toString()
  );

  if (error) {
    throw Error(flattenDiagnosticMessageText(error.messageText, '\n'));
  }

  return config;
};

/**
 * Which is the typescript terminology for your whole application
 **/
const _createProgramAndEmit = (fileNames, options) => {
  const program = createProgram(fileNames, options);

  let emitResult = program.emit();

  let allDiagnostics = getPreEmitDiagnostics(program).concat(
    emitResult.diagnostics
  );

  if (allDiagnostics.length) {
    allDiagnostics.forEach(diagnostic => {
      if (diagnostic.file) {
        let { line, character } = getLineAndCharacterOfPosition(
          diagnostic.file,
          diagnostic.start
        );
        let message = flattenDiagnosticMessageText(
          diagnostic.messageText,
          '\n'
        );
        console.log(
          `${diagnostic.file.fileName} (${line + 1},${
            character + 1
          }: ${message})`
        );
      } else {
        console.log(flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
      }
    });
  } else {
    console.log('Compiled with no errors');
  }

  const exitCode = emitResult.emitSkipped ? 1 : 0;

  process.exit(exitCode);
};

/**
 *
 * @param {string} entry
 */
exports.runWithConfig = entry => {
  const config = _findConfigFile();
  _createProgramAndEmit([entry], config.compilerOptions);
};

module.exports = exports;
