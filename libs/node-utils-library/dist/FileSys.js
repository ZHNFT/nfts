"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSys = void 0;
var fs = require("fs");
var path = require("path");
var process = require("process");
var FileSys = /** @class */ (function () {
    function FileSys(filePath) {
        this._cwd = process.cwd();
        this._filePath = filePath;
    }
    FileSys.getAbsolutePath = function (filePath) {
        var _isAbsPath = path.isAbsolute(filePath);
        return _isAbsPath ? filePath : path.join(process.cwd(), filePath);
    };
    Object.defineProperty(FileSys.prototype, "filePath", {
        get: function () {
            return FileSys.getAbsolutePath(this._filePath);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileSys.prototype, "filePathAbs", {
        get: function () {
            return path.resolve(process.cwd(), this.filePath);
        },
        enumerable: false,
        configurable: true
    });
    FileSys.prototype._readFile = function () {
        this._accessCheck();
        return fs.readFileSync(this.filePath, {});
    };
    FileSys.prototype._writeFile = function (json) {
        this._accessCheck();
        fs.writeFileSync(this.filePath, JSON.stringify(json, null, 2), {
            encoding: 'utf-8'
        });
    };
    FileSys.prototype._accessCheck = function () {
        try {
            fs.accessSync(this.filePath);
        }
        catch (error) {
            console.error("\u65E0\u6CD5\u8BBF\u95EE\u6587\u4EF6\uFF1A".concat(this.filePath));
        }
    };
    FileSys.prototype._toJson = function () {
        var jsonString = this._readFile().toString('utf-8');
        try {
            return JSON.parse(jsonString);
        }
        catch (error) {
            console.error(error);
        }
    };
    FileSys.prototype.readFile = function () {
        return this._readFile().toString('utf8');
    };
    FileSys.prototype.readJsonFile = function () {
        return this._toJson();
    };
    FileSys.prototype.updateJsonFile = function (json) {
        this._writeFile(json);
    };
    return FileSys;
}());
exports.FileSys = FileSys;
