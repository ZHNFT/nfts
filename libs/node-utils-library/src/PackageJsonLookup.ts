import { IPackageJson, PackageJson } from './PackageJson';
import { FileSystem } from './FileSystem';
import * as path from 'path';
import * as process from 'process';

export class PackageJsonLookup {
  /**
   * 根据给出的路径查找packageJson文件
   * */
  public static loadPackageJson(): IPackageJson {
    return FileSystem.readJsonSync(
      path.resolve(process.cwd(), 'package.json')
    ) as unknown as IPackageJson;
  }
}
