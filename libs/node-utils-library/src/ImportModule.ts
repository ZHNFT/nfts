/**
 * @deprecated
 * 请使用 Import 模块
 * */
import { createRequire } from 'module';
import { resolve } from 'path';
import { FileSystem } from './FileSystem';
import { Constants } from './packageJson/PackageJsonLookup';
import { IPackageJson } from './packageJson';

interface ImportModuleOptions {
  cwd?: string;
  nodeModules?: string;
}

const defaultOptions = {
  cwd: process.cwd(),
  nodeModules: 'node_modules'
};

export class ImportModule {
  private static _resolveNodeModules(cwd: string, nodeModulesPath: string) {
    return resolve(cwd, nodeModulesPath);
  }

  private static _resolveMainFile(req: NodeRequire, moduleName: string) {
    const _modulePath = resolve(req.main.paths[0], moduleName);
    const _pkgPath = resolve(_modulePath, Constants.PackageJson);

    const _pkg = FileSystem.readJsonSync<IPackageJson>(_pkgPath);

    const { main } = _pkg;

    return resolve(_modulePath, main ?? Constants.DefaultMainEntryFle);
  }

  private static _create(options: ImportModuleOptions = {}): NodeRequire {
    const _nodeModulePath = ImportModule._resolveNodeModules(options.cwd, options.nodeModules);
    const req = createRequire(_nodeModulePath);
    req.main.paths.unshift(_nodeModulePath);
    return req;
  }

  /**
   *
   * @param userOptions
   * @returns
   *
   * @usage ImportModule.lazyModule("lodash")().cloneDeep(obj);
   *
   */
  public static lazyModule(userOptions?: ImportModuleOptions): (moduleName: string) => any {
    const _opts = Object.assign({}, defaultOptions, userOptions);
    const _req = ImportModule._create(_opts);

    return (moduleName: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return _req(ImportModule._resolveMainFile(_req, moduleName));
    };
  }

  /**
   *
   * @param moduleName
   * @param userOptions
   * @returns
   *
   * @usage ImportModule.import("lodash");
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static import(moduleName: string, userOptions?: ImportModuleOptions): any {
    return this.lazyModule(userOptions)(moduleName);
  }
}
