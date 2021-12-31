"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentsParserResult = void 0;
var ArgumentsParserError_1 = require("./ArgumentsParserError");
var ArgumentsParserResult = /** @class */ (function () {
    function ArgumentsParserResult() {
        var _this = this;
        /**
         * 解析出来的参数对象；一旦解析完成，参数对象将被冻结，无法通过setParamValueByName更新；
         */
        this._params = new Map();
        this.getCommand = function () { return _this._command; };
        this.getSubCommands = function () { return Array.from(_this._subCommands); };
        this.setValueByParamName = function (paramName, value) { return _this._params.set(paramName, value); };
        this.getValueByParamName = function (paramName) { return _this._params.get(paramName); };
        this._subCommands = new Set();
        this._params = new Map();
        this._errors = [];
    }
    Object.defineProperty(ArgumentsParserResult.prototype, "command", {
        get: function () {
            return this._command;
        },
        set: function (_) {
            throw new ArgumentsParserError_1.ArgumentsParserError("command field in ArgumentsParserResult can not be set directly");
        },
        enumerable: false,
        configurable: true
    });
    ArgumentsParserResult.prototype.hasParam = function (paramName) {
        return this._params.has(paramName);
    };
    ArgumentsParserResult.prototype.setCommand = function (commandName) {
        this._command = commandName;
    };
    ArgumentsParserResult.prototype.addSubCommand = function (subCommand) {
        if (this._subCommands.has(subCommand)) {
            this._errors.push(new ArgumentsParserError_1.ArgumentsParserError("SubCommandName: ".concat(subCommand, " is already defined")));
        }
        this._subCommands.add(subCommand);
    };
    return ArgumentsParserResult;
}());
exports.ArgumentsParserResult = ArgumentsParserResult;
