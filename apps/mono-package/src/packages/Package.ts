import { ErrorKind, InternalError, IPackageJson, PackageJson } from '@ntfs/node-utils-library';

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

export interface IBasePackageInitOptions extends IBasePackage {
  readonly packagePath: string;
  readonly packageJson: PackageJson;
}

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

  public constructor({ packagePath, packageJson }: IBasePackageInitOptions) {
    const _packageJsonData = packageJson.readJsonFile<IPackageJson>();

    if (!_packageJsonData.name || !_packageJsonData.version) {
      throw new InternalError({
        message: 'No name and version fields in package.json' + '[Module path] ' + packagePath,
        kind: ErrorKind.Fatal
      });
    }

    this.packagePath = packagePath;
    this.packageJson = packageJson;
  }
}
