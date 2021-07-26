/**
 * @private
 */
type Contributor = {
  name: string;
  email?: string;
  url?: string;
};

/**
 * @public
 */
export interface BasePackageJson {
  name: string;
  version: string;
  main?: string;
  private?: string;
  description?: string;
  repository?: string;
  bugs?: string;
  homepage?: string;
  license?: string;
  keywords?: Array<string>;
  contributors?: Array<string> | Array<Contributor>;
  engines?: {
    node?: string;
    [engine: string]: string | undefined;
  };
  author?:
    | string
    | {
        name?: string;
        email?: string;
      };
  bin?: Record<string, string>;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  browserslist?: Array<string>;
}

/**
 * @public
 */
export function tryLoadPackageJsonFromLocal<T extends BasePackageJson>(): T {
  const pjson = {} as T;
  return pjson;
}

/**
 * @public
 * @description 加载模块制定模块的package.json
 *
 * @example
 * ```ts
 * import { tryLoadPackageJsonFromPackage } from "@raydium/node-lib-tool";
 * /// ...
 * /// 加载指定模块的package.json数据
 * const json = tryLoadPackageJsonFromPackage("packageName")
 * /// ...
 * ```
 */
export function tryLoadPackageJsonFromPackage<T extends BasePackageJson>(): T {
  const pjson = {} as T;
  return pjson;
}
