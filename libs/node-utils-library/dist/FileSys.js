import * as fs from 'fs';
import * as path from 'path';
export class FileSys {
    constructor(filePath) {
        this._cwd = process.cwd();
        this._filePath = filePath;
    }
    get filePath() {
        return path.isAbsolute(this._filePath) ? this._filePath : path.join(this._cwd, this._filePath);
    }
    _readFile() {
        this._accessCheck();
        return fs.readFileSync(this.filePath, {});
    }
    _writeFile(json) {
        this._accessCheck();
        fs.writeFileSync(this.filePath, JSON.stringify(json, null, 2), {
            encoding: 'utf-8'
        });
    }
    _accessCheck() {
        try {
            fs.accessSync(this.filePath);
        }
        catch (error) {
            console.error(`无法访问文件：${this.filePath}`);
        }
    }
    _toJson() {
        let jsonString = this._readFile().toString('utf-8');
        try {
            return JSON.parse(jsonString);
        }
        catch (error) {
            console.error(error);
        }
    }
    readJsonFile() {
        return this._toJson();
    }
    writeJsonFile(json) {
        this._writeFile(json);
    }
}
