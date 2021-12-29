"use strict";
exports.__esModule = true;
exports.ArgumentsParserResult = void 0;
var ArgumentsParserError_1 = require("./ArgumentsParserError");
var ArgumentsParserResult = /** @class */ (function () {
    function ArgumentsParserResult() {
        /**
         * 解析出来的参数对象；一旦解析完成，参数对象将被冻结，无法通过setParamValueByName更新；
         * @type {}
         */
        this.params = Object.create(null);
    }
    /**
     * 设置param值；
     * @param paramName
     * @param value
     */
    ArgumentsParserResult.prototype.setParamValueByName = function (paramName, value) {
        this.params[paramName] = value;
    };
    /**
     * 获取param的值；
     * @param paramName
     */
    ArgumentsParserResult.prototype.getParamValueByName = function (paramName) {
        return this.params[paramName];
    };
    /**
     * paramName是否存在与解析好的参数表中；
     * @param paramName
     */
    ArgumentsParserResult.prototype.hasParam = function (paramName) {
        return Object.prototype.hasOwnProperty.call(this.params, paramName);
    };
    /**
     * 设置command名称
     * @param commandName
     */
    ArgumentsParserResult.prototype.setCommand = function (commandName) {
        this.command = commandName;
    };
    ArgumentsParserResult.prototype.addSubCommands = function (commandName) {
        if (this.subCommands.has(commandName)) {
            this.errors.push(new ArgumentsParserError_1.ArgumentsParserError("SubCommandName: ".concat(commandName, " is already defined")));
            // todo Throw Error?
        }
        this.subCommands.add(commandName);
    };
    /**
     * 冻结params对象，使其无法再次被更新；
     */
    ArgumentsParserResult.prototype._frozen = function () {
        this.params = Object.freeze(this.params);
    };
    return ArgumentsParserResult;
}());
exports.ArgumentsParserResult = ArgumentsParserResult;
