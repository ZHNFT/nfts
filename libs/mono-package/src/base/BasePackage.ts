import { PackageJson } from '@ntfs/node-utils-library';

export interface IBasePackage {
  /**
   * 包的路径
   */
  readonly packagePath: string;
  /**
   * package.json的对象
   */
  readonly packageJson: PackageJson;
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
  packageJson: PackageJson;
  /**
   * 范围包名称
   */
  scopedName?: string;

  public static scopedPackage = /^@[a-z]+(\/).+$/;

  public constructor({ packagePath, packageJson }: IBasePackageInitOptions) {
    this.packagePath = packagePath;
    this.packageJson = packageJson;
  }
}
