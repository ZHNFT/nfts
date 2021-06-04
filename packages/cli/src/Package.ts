export interface IPackageJson {
  dependencies?: {
    [key: string]: string;
  };
  devDependencies?: {
    [key: string]: string;
  };
  peerDependencies?: {
    [key: string]: string;
  };
  main: string;
  version: string;
  workspaces?: string[];
  exports: {
    node: string;
    default: string;
  };
  [key: string]: unknown;
}

export default class Package {
  constructor() {
    //
  }
}
