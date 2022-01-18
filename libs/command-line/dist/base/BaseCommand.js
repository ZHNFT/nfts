"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
/**
 * @desc 使用BaseCommand来构建命令行工具；
 *        Command实现类需要具备一下几种必须属性
 *        - 1
 *        - 2
 *
 * @example
 *
 *
 */
var BaseCommand = /** @class */ (function () {
    function BaseCommand(opts) {
        this.commandName = opts.commandName;
        this.commandDescription = opts.commandDescription;
        this._subCommandsByName = new Map();
    }
    /**
     * 直接添加SubCommand类；
     */
    BaseCommand.prototype.defineSubCommand = function (subCommand) {
        this._subCommandsByName.set(subCommand.subCommandName, subCommand);
    };
    return BaseCommand;
}());
exports.BaseCommand = BaseCommand;
