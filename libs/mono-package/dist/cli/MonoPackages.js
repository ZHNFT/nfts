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
exports.MonoPackages = void 0;
var command_line_1 = require("@ntfs/command-line");
var MonoPackageConfig_1 = require("../base/MonoPackageConfig");
var InstallSubCommand_1 = require("../sub-commands/InstallSubCommand");
var MonoPackages = /** @class */ (function (_super) {
    __extends(MonoPackages, _super);
    function MonoPackages() {
        var _this = _super.call(this, {
            toolName: 'mono-package',
            toolDescription: 'this is a mono-package description'
        }) || this;
        _this._config = new MonoPackageConfig_1.MonoPackageConfig();
        var SubCommandContext = {
            parser: _this._parser,
            config: _this._config
        };
        var install = new InstallSubCommand_1.InstallSubCommand(SubCommandContext).initialize();
        _this.defineSubCommand(install);
        _this._parser.exec(process.argv.slice(1).join(' '));
        return _this;
    }
    MonoPackages.prototype.prepare = function () {
        this._readConfigFromCommandLine();
        return this;
    };
    MonoPackages.prototype.exec = function () {
        if (!this._parser.result.getCommand()) {
            throw Error('需要一个命令');
        }
        var subCommands = this._subCommandsByName.values();
        var _targetSubCommand;
        for (var _i = 0, subCommands_1 = subCommands; _i < subCommands_1.length; _i++) {
            var subCommand = subCommands_1[_i];
            if (this._parser.result.getSubCommands().includes(subCommand.subCommandName)) {
                _targetSubCommand = subCommand;
            }
        }
        if (!_targetSubCommand) {
            throw Error('没有匹配到任何子命令');
        }
        return _targetSubCommand.apply();
    };
    MonoPackages.prototype._readConfigFromCommandLine = function () {
        var _configPath = this._parser.result.getValueByParamName('--config');
        if (_configPath) {
            // @todo 这里需要使用JsonSchema来验证指定的配置的文件格式是否正确
            this._config = new MonoPackageConfig_1.MonoPackageConfig(_configPath);
        }
    };
    return MonoPackages;
}(command_line_1.CommandLineToolDefinition));
exports.MonoPackages = MonoPackages;
