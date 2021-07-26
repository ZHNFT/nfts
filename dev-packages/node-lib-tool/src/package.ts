type Contributor = {
  name: string;
  emial?: string;
  url?: string;
};

/**
 * @interface package.json
 */
export interface BasePackage {
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

export function tryLoadPackageJsonInLocal<T extends BasePackage>(): T {
  const pjson = {} as T;
  return pjson;
}
