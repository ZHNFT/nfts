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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonoPackages = void 0;
var command_line_1 = require("@ntfs/command-line");
var MonoPackageConfig_1 = require("../base/MonoPackageConfig");
var InstallSubCommand_1 = require("../sub-commands/InstallSubCommand");
var LinkSubCommand_1 = require("../sub-commands/LinkSubCommand");
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
        var installCommand = new InstallSubCommand_1.InstallSubCommand(SubCommandContext).initialize();
        var linkCommand = new LinkSubCommand_1.LinkSubCommand(SubCommandContext).initialize();
        _this.defineSubCommand(installCommand);
        _this.defineSubCommand(linkCommand);
        _this._parser.exec(process.argv.slice(1).join(' '));
        return _this;
    }
    MonoPackages.prototype.prepare = function () {
        this._readConfigFromCommandLine();
        return this;
    };
    MonoPackages.prototype.exec = function () {
        var e_1, _a;
        if (!this._parser.result.getCommand()) {
            throw Error('需要一个命令');
        }
        var subCommands = this._subCommandsByName.values();
        var _targetSubCommand;
        try {
            for (var subCommands_1 = __values(subCommands), subCommands_1_1 = subCommands_1.next(); !subCommands_1_1.done; subCommands_1_1 = subCommands_1.next()) {
                var subCommand = subCommands_1_1.value;
                if (this._parser.result.getSubCommands().includes(subCommand.subCommandName)) {
                    _targetSubCommand = subCommand;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (subCommands_1_1 && !subCommands_1_1.done && (_a = subCommands_1.return)) _a.call(subCommands_1);
            }
            finally { if (e_1) throw e_1.error; }
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
