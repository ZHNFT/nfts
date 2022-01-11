"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSubCommand = void 0;
var BaseSubCommand = /** @class */ (function () {
    function BaseSubCommand(_a) {
        var subCommandName = _a.subCommandName, subCommandDescription = _a.subCommandDescription, parser = _a.parser;
        this.subCommandName = subCommandName;
        this.subCommandDescription = subCommandDescription;
        this.parser = parser;
        /**
         * 初始化子命令的同时，也需要注册子命令接受的一些命令行参数信息；
         */
        this.onParametersDefine(parser);
    }
    return BaseSubCommand;
}());
exports.BaseSubCommand = BaseSubCommand;
