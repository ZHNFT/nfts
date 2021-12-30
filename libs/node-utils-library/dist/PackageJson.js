"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageJson = void 0;
var FileSys_1 = require("./FileSys");
var PackageJson = /** @class */ (function (_super) {
    __extends(PackageJson, _super);
    function PackageJson(packageJsonFilePath) {
        return _super.call(this, packageJsonFilePath) || this;
    }
    /**
     * 查找package.json文件
     */
    PackageJson.prototype.findPackageJson = function () {
        return this.readJsonFile();
    };
    /**
     * 更新 package.json 文件
     */
    PackageJson.prototype.updatePackageJson = function (obj) {
        this.updateJsonFile(obj);
    };
    return PackageJson;
}(FileSys_1.FileSys));
exports.PackageJson = PackageJson;
