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
exports.InstallSubCommand = void 0;
var command_line_1 = require("@ntfs/command-line");
var InstallSubCommand = /** @class */ (function (_super) {
    __extends(InstallSubCommand, _super);
    function InstallSubCommand(_a) {
        var parser = _a.parser, config = _a.config, manager = _a.manager;
        var _this = _super.call(this, {
            subCommandName: 'install',
            subCommandDescription: 'install dependencies for all packages',
            parser: parser
        }) || this;
        _this._config = config;
        _this._manager = manager;
        return _this;
    }
    InstallSubCommand.prototype.onParametersDefine = function () {
        this.parser.defineParam({
            longName: '--config',
            shortName: '-C',
            summary: '这个配置会在终端打印出一串文字'
        });
    };
    InstallSubCommand.prototype.apply = function () {
        console.log('install command');
        return this._manager.installPackages();
    };
    InstallSubCommand.prototype.initialize = function (args) {
        return undefined;
    };
    return InstallSubCommand;
}(command_line_1.BaseSubCommand));
exports.InstallSubCommand = InstallSubCommand;
