/**
 * 模块的同步导入实现
 * @status WIP
 */
import * as fs from 'fs';
import * as path from 'path';
import * as NodeModule from 'module';
import * as Constants from './Constants';
import * as Json from './Json';
import * as Package from './IPackageJson';

export interface ImportModuleSyncOptions {
  cwd?: string;
  node_modules?: string;
}

const DEFAULT_IMPORT_SYNC_OPTIONS = {
  cwd: __dirname,
  node_modules: path.resolve(__dirname, Constants.nodeModulePath)
};

/**
 * 同步导入模块。（commonjs模块化文件或者npm包）
 * @param moduleName
 * @param options
 */
export function sync(moduleName: string, options: ImportModuleSyncOptions = DEFAULT_IMPORT_SYNC_OPTIONS): unknown {
  options = Object.assign({}, DEFAULT_IMPORT_SYNC_OPTIONS, options);
  const req = NodeModule.createRequire(options.cwd);
  const fileModuleFullPath = path.resolve(options.cwd, moduleName);

  // file module
  if (fs.existsSync(fileModuleFullPath) && fs.statSync(fileModuleFullPath).isFile()) {
    return req(fileModuleFullPath);
  }

  // npm package
  const packagePath = path.resolve(options.cwd, options.node_modules, moduleName);
  const packageJsonPath = path.resolve(packagePath, Constants.packageJsonPath);

  if (!fs.existsSync(packageJsonPath)) {
    throw Error(`No package.json file found in package "${path.relative(options.cwd, packagePath)}"`);
  }

  const pkgJson: Package.IPackageJson = Json.readJsonSync(packageJsonPath);

  // const mainEntry: string;

  if (!pkgJson.main) {
    throw new Error(`main字段不存在`);
  }

  const mainEntry = path.resolve(packagePath, pkgJson.main);
  return req(mainEntry);
}

export function resolveModule(moduleName, options: { cwd: string } = { cwd: process.cwd() }) {
  // TODO 添加模块路径解析的逻辑
}
