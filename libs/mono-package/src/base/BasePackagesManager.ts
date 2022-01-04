import { MonoPackagesConfig } from './MonoPackagesConfig';

export interface IPackageDefinition {
  packageName: string;
  description: string;
  directory: string;
}

export interface IPackagesManager {}

export interface TPackagesManagerInitOptions {
  config: MonoPackagesConfig;
}

export abstract class BasePackagesManager implements IPackagesManager {
  protected readonly _config: MonoPackagesConfig;

  protected constructor({ config }: TPackagesManagerInitOptions) {
    this._config = config;
  }

  abstract install(): Promise<void>;

  abstract uninstall(): Promise<void>;

  abstract link(): Promise<void>;

  abstract workspace(): Promise<void>;
}
