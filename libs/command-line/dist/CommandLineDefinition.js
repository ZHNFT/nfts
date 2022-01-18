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
exports.CommandLineToolDefinition = void 0;
var node_arg_parser_1 = require("@ntfs/node-arg-parser");
var BaseParameter_1 = require("./base/BaseParameter");
var BaseCommand_1 = require("./base/BaseCommand");
var node_utils_library_1 = require("@ntfs/node-utils-library");
var CommandLineToolDefinition = /** @class */ (function (_super) {
    __extends(CommandLineToolDefinition, _super);
    function CommandLineToolDefinition(_a) {
        var toolName = _a.toolName, toolDescription = _a.toolDescription;
        var _this = _super.call(this, {
            commandName: toolName,
            commandDescription: toolDescription
        }) || this;
        _this._parser = new node_arg_parser_1.ArgumentsParser();
        return _this;
    }
    Object.defineProperty(CommandLineToolDefinition.prototype, "parser", {
        get: function () {
            return this._parser;
        },
        set: function (value) {
            throw new node_utils_library_1.InternalError({ message: "Can't set parser directly", kind: node_utils_library_1.ErrorKind.Fatal });
        },
        enumerable: false,
        configurable: true
    });
    CommandLineToolDefinition.prototype.defineParameters = function (paramDefinitions) {
        for (var _i = 0, paramDefinitions_1 = paramDefinitions; _i < paramDefinitions_1.length; _i++) {
            var definition = paramDefinitions_1[_i];
            var parameterInstance = new BaseParameter_1.BaseParameter(definition);
            this._parameterByName.set(definition.longName, parameterInstance);
            this._parameterByName.set(definition.shortName, parameterInstance);
            this._parser.defineParam(definition);
        }
    };
    return CommandLineToolDefinition;
}(BaseCommand_1.BaseCommand));
exports.CommandLineToolDefinition = CommandLineToolDefinition;
