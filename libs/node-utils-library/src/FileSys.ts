import * as fs from 'fs';
import * as path from 'path';

export abstract class FileSys {
	private readonly _filePath: string;
	private readonly _cwd: string = process.cwd();

	public constructor(filePath: string) {
		this._filePath = filePath;
	}

	get filePath(): string {
		return path.isAbsolute(this._filePath) ? this._filePath : path.join(this._cwd, this._filePath);
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

	protected _toJson() {
		const jsonString = this._readFile().toString('utf-8');

		try {
			return JSON.parse(jsonString);
		} catch (error) {
			console.error(error);
		}
	}

	readJsonFile() {
		return this._toJson();
	}

	writeJsonFile(json: any): void {
		this._writeFile(json);
	}
}
