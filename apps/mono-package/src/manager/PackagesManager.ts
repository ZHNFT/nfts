import { MonoPackagesConfig } from '../config/MonoPackagesConfig';

/**
 * 包/库的定义结构
 */
export interface IPackageDefinition {
  packageName: string;
  description: string;
  directory: string;
}

export interface IPackagesManager {
  config: MonoPackagesConfig;
}

export interface TPackagesManagerInitOptions extends IPackagesManager {
  '//'?: string;
}

export abstract class PackagesManager implements IPackagesManager {
  readonly config: MonoPackagesConfig;
  protected constructor({ config }: TPackagesManagerInitOptions) {
    this.config = config;
  }
  abstract installPackages(): Promise<void>;
  abstract linkPackage(): Promise<void>;
}
