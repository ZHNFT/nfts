/**
 * 模块的同步导入实现
 * @status WIP
 */
import fs from "fs";
import path from "path";
import NodeModule from "module";
import * as Constants from "./Constants";
import * as Package from "./package-json";
import { readJsonSync } from "./FsExtra";
import { object as objectUtils } from "./utilities";

export interface ImportModuleSyncOptions {
  cwd?: string;
  node_modules?: string;
}

const DEFAULT_IMPORT_SYNC_OPTIONS = {
  cwd: process.cwd(),
  node_modules: path.resolve(process.cwd(), Constants.nodeModulePath),
};

/**
 * 同步导入模块。（commonjs模块化文件或者npm包）
 * @param moduleName
 * @param options
 */
export function sync(
  moduleName: string,
  options: ImportModuleSyncOptions = DEFAULT_IMPORT_SYNC_OPTIONS
): unknown {
  options = objectUtils.merge(
    DEFAULT_IMPORT_SYNC_OPTIONS,
    options
  ) as ImportModuleSyncOptions;
  const req = NodeModule.createRequire(options.cwd!);
  const fileModuleFullPath = path.resolve(options.cwd!, moduleName);

  // file module
  if (
    fs.existsSync(fileModuleFullPath) &&
    fs.statSync(fileModuleFullPath).isFile()
  ) {
    return req(fileModuleFullPath);
  }

  // package module
  const packagePath = path.resolve(
    options.cwd!,
    options.node_modules!,
    moduleName
  );
  const packageJsonPath = path.resolve(packagePath, Constants.packageJsonPath);

  if (!fs.existsSync(packageJsonPath)) {
    throw Error(
      `No package.json file found in package "${path.relative(
        options.cwd!,
        packagePath
      )}"`
    );
  }

  const pkgJson: Package.IPackageJson = readJsonSync(packageJsonPath);
  // const mainEntry: string;
  if (pkgJson.main === undefined) {
    throw new Error(
      `"main" field is not exist in package.json of module ${moduleName}`
    );
  }
  const mainEntry = path.resolve(packagePath, pkgJson.main);
  const mod = req(mainEntry) as { default?: unknown };
  return mod && mod.default ? mod.default : mod;
}

/**
 * resolve module path
 * @param moduleName
 * @param options
 * @returns
 */
export function resolve(
  moduleName: string,
  options: ImportModuleSyncOptions = DEFAULT_IMPORT_SYNC_OPTIONS
) {
  options = objectUtils.merge(
    DEFAULT_IMPORT_SYNC_OPTIONS,
    options
  ) as ImportModuleSyncOptions;
  const req = NodeModule.createRequire(options.cwd!);
  const fileModuleFullPath = path.resolve(options.cwd!, moduleName);

  if (
    fs.existsSync(fileModuleFullPath) &&
    fs.statSync(fileModuleFullPath).isFile()
  ) {
    return fileModuleFullPath;
  } else {
    return req.resolve(moduleName, { paths: [options.node_modules!] });
  }
}
