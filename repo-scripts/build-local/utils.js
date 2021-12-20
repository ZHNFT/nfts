const { log } = require('console');
const { join } = require('path');
const {
  createProgram,
  flattenDiagnosticMessageText,
  readJsonConfigFile,
  convertToObject
} = require('typescript');
const { ModuleKind } = require('typescript');
const { ScriptTarget } = require('typescript');
const { getLineAndCharacterOfPosition } = require('typescript');
const { getPreEmitDiagnostics } = require('typescript');

const { NTFS_DEFAULT_CONFIG_PATH } = require('./constants');

const _findConfigFile = () => {
  const tsConfigFilePath = join(NTFS_DEFAULT_CONFIG_PATH, 'tsconfig.json');
  const configSource = readJsonConfigFile(tsConfigFilePath, path => {
    log('path:', path);
    return path;
  });
  // log('config:', configSource);
  log('JsonConfig', convertToObject(configSource, []));
  return configSource;
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

exports.runWithConfig = () => {
  const cwd = process.cwd();

  const config = _findConfigFile();

  _createProgramAndEmit([join(cwd, 'src/index.ts')], {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ScriptTarget.ES5,
    module: ModuleKind.CommonJS,
    outDir: './dist'
  });
};

exports.runWithoutConfig = () => {};

exports.unBeforeVersionCheck = () => {};

module.exports = exports;
