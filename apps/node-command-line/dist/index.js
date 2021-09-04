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
exports.CommandLineTool = void 0;
const NodeCommandLineParser_1 = require("./framework/NodeCommandLineParser");
class CommandLineTool extends NodeCommandLineParser_1.NodeCommandLineParser {
    constructor({ toolName, toolDescription }) {
        super();
        this.actionByName = new Map();
        this.toolName = toolName;
        this.toolDescription = toolDescription;
    }
    /**
     *
     * @param actionName
     * @param action
     *
     * @example
     *
     * // 注册action
     * const buildAction = new ActionBase({ actionName: "build" })
     * CLT.addAction('action', )
     *
     */
    addAction(action) {
        this.actionByName.set(action.name, action);
        this.actions.push(action);
    }
    /**
     * @description 获取到action，通过actionName
     * @param actionName
     */
    getAction(actionName) {
        return this.actionByName.get(actionName);
    }
}
exports.CommandLineTool = CommandLineTool;
__exportStar(require("./framework/ActionBase"), exports);
__exportStar(require("./framework/EventBase"), exports);
__exportStar(require("./framework/NodeCommandLineParser"), exports);
