import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

export class FileSys {
  private readonly _filePath: string;
  private readonly _cwd: string;

  constructor(filePath: string) {
    this._filePath = filePath;
    this._cwd = path.dirname(filePath);
  }

  public static getAbsolutePath(filePath: string): string {
    const _isAbsPath = path.isAbsolute(filePath);
    return _isAbsPath ? filePath : path.join(process.cwd(), filePath);
  }

  get filePath(): string {
    return FileSys.getAbsolutePath(this._filePath);
  }

  get filePathAbs(): string {
    return path.resolve(process.cwd(), this.filePath);
  }

  public readFile(): string {
    return this._readFile().toString('utf8');
  }

  public readJsonFile<T>(): T {
    return this._toJson<T>();
  }

  public updateJsonFile<T>(json: Partial<T>): void {
    this._writeFile(json);
  }

  private _readFile(): Buffer {
    this._accessCheck();
    return fs.readFileSync(this.filePath, {});
  }

  private _writeFile(json: any): void {
    this._accessCheck();
    fs.writeFileSync(this.filePath, JSON.stringify(json, null, 2), {
      encoding: 'utf-8'
    });
  }

  private _accessCheck() {
    try {
      fs.accessSync(this.filePath);
    } catch (error) {
      console.error(`无法访问文件：${this.filePath}`);
    }
  }

  private _toJson<T>(): T {
    const jsonString = this._readFile().toString('utf-8');

    try {
      return JSON.parse(jsonString) as T;
    } catch (error) {
      console.error(error);
    }
  }
}
