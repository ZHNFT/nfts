import {
  BasePackagesManager,
  IPackageDefinition,
  TPackagesManagerInitOptions
} from '../../base/BasePackagesManager';
import { BasePackage } from '../../base/BasePackage';
import { join } from 'path';
import { PackageJson } from '@ntfs/node-utils-library';
import * as process from 'process';
import { Constants } from '../../Constants';
import * as console from 'console';

export class PnpmPackagesManager extends BasePackagesManager {
  private readonly _packages: BasePackage[] = [];

  constructor(options: TPackagesManagerInitOptions) {
    super(options);
    const __localConfig = this.config.readJsonFile<{ packages: IPackageDefinition[] }>();
    this._preparePackagesFromConfigFile(__localConfig.packages);
  }

  /**
   * 从文件读取配置信息
   */
  _preparePackagesFromConfigFile(packages: IPackageDefinition[]): void {
    for (const packageDefinition of packages) {
      const packagePath = join(process.cwd(), packageDefinition.directory);
      const packageJsonPath = join(packagePath, Constants.packageJsonFilePath);

      const packageJson = new PackageJson(packageJsonPath);

      this._packages.push(
        new BasePackage({
          packagePath,
          packageJson
        })
      );
    }
  }

  public installPackages(): Promise<void> {
    console.log(this._packages);
    return Promise.resolve();
  }

  public linkPackage(): Promise<void> {
    return Promise.resolve();
  }
}
