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
exports.MonoPackageConfig = void 0;
var node_utils_library_1 = require("@ntfs/node-utils-library");
var Constants_1 = require("../Constants");
var MonoPackageConfig = /** @class */ (function (_super) {
    __extends(MonoPackageConfig, _super);
    function MonoPackageConfig(configPath) {
        return _super.call(this, configPath !== null && configPath !== void 0 ? configPath : Constants_1.Constants.monoPackagesConfigurationDefaultPath) || this;
    }
    return MonoPackageConfig;
}(node_utils_library_1.FileSys));
exports.MonoPackageConfig = MonoPackageConfig;
