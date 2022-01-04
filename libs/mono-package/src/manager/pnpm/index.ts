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

export class PnpmPackagesManager extends BasePackagesManager {
  private _packages: BasePackage[];

  constructor(options: TPackagesManagerInitOptions) {
    super(options);

    const __localConfig = this._config.readJsonFile<{ packages: IPackageDefinition[] }>();

    this._preparePackagesFromConfigFile(__localConfig.packages);
  }

  async install(): Promise<void> {}

  uninstall(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  link(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  workspace(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /**
   * 从文件读取配置信息l
   */
  _preparePackagesFromConfigFile(packages: IPackageDefinition[]) {
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
}
