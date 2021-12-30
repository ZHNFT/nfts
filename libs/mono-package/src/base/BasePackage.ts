import { PackageJson } from '@ntfs/node-utils-library';

export interface IBasePackage {
  /**
   * 包的路径
   */
  readonly packagePath: string;
  /**
   * package.json的对象
   */
  readonly PackageJson: PackageJson;
}

export interface IBasePackageInitOptions extends IBasePackage {}

export class BasePackage implements IBasePackage {
  /**
   * packageName
   */
  name: string;
  /**
   * Package Folder Path
   */
  packagePath: string;
  /**
   * `package.json` 文件对象
   */
  PackageJson: PackageJson;

  public constructor({ packagePath }: IBasePackageInitOptions) {
    this.packagePath = packagePath;
    this.PackageJson = new PackageJson('./package.json');
  }
}
