import { IJson } from './Json';
import * as fs from 'fs';
import * as path from 'path';
import { ScopedError } from './Error';
import * as process from 'process';
import { IPackageJson } from './PackageJson';

export abstract class FsProvider {}

export class FileSystem {
  static error: ScopedError = new ScopedError('FileSystem');

  /* 检查文件是否已能访问 - 同步 */
  public static accessSync(path: fs.PathLike, mode?: number): boolean {
    try {
      fs.accessSync(path, mode);
      return true;
    } catch (e) {
      return false;
    }
  }

  /* 检查文件是否已能访问 - 异步 */
  public static access(path: fs.PathLike, mode?: number): Promise<void> {
    return new Promise(resolve => {
      if (!mode) {
        mode = fs.constants.F_OK;
      }

      fs.access(path, mode, err => {
        if (err) {
          throw FileSystem.error.fatal(`无法访问文件: '${path as string}'`);
        } else {
          resolve();
        }
      });
    });
  }

  public static readFile(path: fs.PathLike): Promise<string> {
    return new Promise((resolve, reject) => {
      void FileSystem.access(path, fs.constants.R_OK).then(() => {
        fs.readFile(path, (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(content.toString('utf8'));
          }
        });
      });
    });
  }

  public static readFileSync(path: fs.PathLike): string {
    if (FileSystem.accessSync(path, fs.constants.R_OK)) {
      return fs.readFileSync(path, { encoding: 'utf8' });
    }
  }

  public static writeFile(path: fs.PathLike, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      void FileSystem.access(path, fs.constants.W_OK).then(() => {
        fs.writeFile(path, data, err => {
          if (!err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }

  public static writeFileSync(path: fs.PathLike, data: string): void {
    if (FileSystem.accessSync(path, fs.constants.W_OK)) {
      fs.writeFileSync(path, data);
    }
  }

  public static readJson(path: fs.PathLike): Promise<IJson> {
    return new Promise((resolve, reject) => {
      void FileSystem.readFile(path).then(text => {
        let json: IJson;

        try {
          json = JSON.parse(text) as IJson;
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  public static readJsonSync(path: fs.PathLike): IJson {
    const content = FileSystem.readFileSync(path);
    return JSON.parse(content) as IJson;
  }

  public static readPackageJsonSync(path: fs.PathLike): IPackageJson {
    const content = FileSystem.readFileSync(path);
    return JSON.parse(content) as IPackageJson;
  }

  public static writeJson(path: fs.PathLike, data: IJson): Promise<void> {
    return new Promise((resolve, reject) => {
      FileSystem.writeFile(path, JSON.stringify(data, null, 2))
        .then(resolve)
        .catch(reject);
    });
  }

  public static writeJsonSync(path: fs.PathLike, data: IJson): void {
    const content = JSON.stringify(data, null, 2);
    FileSystem.writeFileSync(path, content);
  }

  /* folderA is subdirectory of folderB */
  public static isSubdirectory(folderA: string, folderB: string): boolean {
    if (path.isAbsolute(folderA) && path.isAbsolute(folderB)) {
      return folderA.includes(folderB);
    }

    return path.join(process.cwd(), folderA).includes(path.join(process.cwd(), folderB));
  }
}
