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
var BaseCommand_1 = require("./base/BaseCommand");
var CommandLineToolDefinition = /** @class */ (function (_super) {
    __extends(CommandLineToolDefinition, _super);
    function CommandLineToolDefinition(_a) {
        var toolName = _a.toolName, toolDescription = _a.toolDescription;
        return _super.call(this, {
            commandName: toolName,
            commandDescription: toolDescription
        }) || this;
    }
    return CommandLineToolDefinition;
}(BaseCommand_1.BaseCommand));
exports.CommandLineToolDefinition = CommandLineToolDefinition;
