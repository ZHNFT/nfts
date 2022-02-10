import * as process from 'process';
import * as path from 'path';
import * as fs from 'fs';
import { FileSystem } from './internal/FileSystem';
import { IPackageJson } from './internal/PackageJson';
import { ScopedError } from './internal/Error';
import { Constants } from './Constants';

export class PackageJsonLookup {
  // packageJson的查找策略。查找范围限制在工作目录下
  // public static lookupWithoutPreciseLocation(): IPackageJson {}
  public static error: ScopedError = new ScopedError('PackageJsonLookup');

  public static lookupWithPreciseLocation(packageScope: string): IPackageJson {
    if (!fs.statSync(packageScope).isDirectory()) {
      throw PackageJsonLookup.error.fatal(
        `The package scope provide is not a directory: ` + packageScope
      );
    }

    const searchingPath = path.resolve(
      process.cwd(),
      packageScope,
      Constants.DefaultPackageJsonFilePath
    );

    return FileSystem.readPackageJsonSync(searchingPath);
  }
}
