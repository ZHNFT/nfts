"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
var node_arg_parser_1 = require("@ntfs/node-arg-parser");
/**
 * @desc 使用BaseCommand来构建命令行工具；
 * 			 Command实现类需要具备一下几种必须属性
 * 			 - 1
 * 			 - 2
 *
 * @example
 *
 *
 */
var BaseCommand = /** @class */ (function () {
    function BaseCommand(opts) {
        this.commandName = opts.commandName;
        this.commandDescription = opts.commandDescription;
        this._parser = new node_arg_parser_1.ArgumentsParser();
        this._subCommandsByName = new Map();
        /**
         * 通用参数；即使没有SubCommand；这些设置的通用参也需要能起作用；
         */
        this._parser.defineParam({
            longName: '--version',
            shortName: '-V',
            summary: 'Display version'
        });
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
