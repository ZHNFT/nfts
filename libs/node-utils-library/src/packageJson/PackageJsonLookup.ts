import * as nodePath from 'path';
import * as nodeFs from 'fs';
import { FileSystem } from '../FileSystem';
import { PackageJson, IPackageJson } from './PackageJson';

export class Constants {
  public static PackageJson = './package.json';
  public static DefaultMainEntryFle = './index.js';
}

interface LookupOptions {
  force?: boolean;
  cwd?: string;
}
export class PackageJsonLookup {
  // 缓存所有找到的packageJson文件
  // 提供 force 来强制更新缓存的数据
  private _cache: Map<string, IPackageJson> = new Map();
  private _defaultOptions: LookupOptions = {
    force: false,
    cwd: process.cwd()
  };

  public lookup() {
    //
  }

  public lookupDiscrete() {
    //
  }

  public lookupByDir(path: string, options: LookupOptions = {}): IPackageJson {
    // todo
    // -[ ] 添加`path`是否是文件夹的判断
    const _options = this._resolveOptions(options);
    const _relPath = nodePath.isAbsolute(path)
      ? path
      : nodePath.resolve(_options.cwd, path);

    const _pkgPath = this._resolvePackageJsonPath(_relPath);

    const _pkg: IPackageJson = FileSystem.readJsonSync(_pkgPath);

    if (options.force || !this._cache.has(_pkg.name)) {
      if (!this._cache.has(_pkg.name)) {
        this._cache.set(_pkg.name, _pkg);
      }
      return _pkg;
    } else {
      return this._cache.get(_pkg.name);
    }
  }

  // 查找父目录或当前目录下的packageJson文件
  private _lookupStrategy() {
    //
  }

  private _resolveOptions(userOptions: LookupOptions): LookupOptions {
    return Object.assign({}, this._defaultOptions, userOptions);
  }

  private _resolvePackageJsonPath(dir: string) {
    const _pkgPath = nodePath.resolve(dir, Constants.PackageJson);

    if (!nodeFs.existsSync(_pkgPath)) {
      throw new Error(`"${_pkgPath}": File Not Found`);
    }

    return _pkgPath;
  }

  public static instance = new PackageJsonLookup();
}
