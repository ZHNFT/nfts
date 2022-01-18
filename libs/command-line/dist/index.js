"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParameter = exports.BaseSubCommand = exports.CommandLineToolDefinition = void 0;
var CommandLineDefinition_1 = require("./CommandLineDefinition");
Object.defineProperty(exports, "CommandLineToolDefinition", { enumerable: true, get: function () { return CommandLineDefinition_1.CommandLineToolDefinition; } });
var BaseSubCommand_1 = require("./base/BaseSubCommand");
Object.defineProperty(exports, "BaseSubCommand", { enumerable: true, get: function () { return BaseSubCommand_1.BaseSubCommand; } });
var BaseParameter_1 = require("./base/BaseParameter");
Object.defineProperty(exports, "BaseParameter", { enumerable: true, get: function () { return BaseParameter_1.BaseParameter; } });
__exportStar(require("./CommandLineTool"), exports);
