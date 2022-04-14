import * as path from 'path';
import * as fs from 'fs';
import * as NodeModule from 'module';

export interface ImportModuleSyncOptions {
  cwd?: string;
  node_modules?: string;
}

const DEFAULT_IMPORT_SYNC_OPTIONS = {
  cwd: __dirname,
  node_modules: path.resolve(__dirname, 'node_modules')
};

/**
 * 同步导入模块。（commonjs模块化文件或者npm包）
 * @param moduleName
 * @param options
 */
export function sync(
  moduleName: string,
  options: ImportModuleSyncOptions = {
    cwd: __dirname,
    node_modules: path.resolve(__dirname, 'node_modules')
  }
): unknown {
  options = Object.assign({}, options, DEFAULT_IMPORT_SYNC_OPTIONS);
  const req = NodeModule.createRequire(options.cwd);
  const moduleFullPath = path.resolve(options.cwd, moduleName);
  if (fs.existsSync(moduleFullPath) && fs.statSync(moduleFullPath).isFile()) {
    // 文件模块
    return req(moduleFullPath);
  }

  // TODO npm模块
}
