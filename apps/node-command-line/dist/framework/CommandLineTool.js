"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLineTool = void 0;
const NodeCommandLineParser_1 = require("./NodeCommandLineParser");
const process = require("process");
/**
 * @class CommandLineTool
 */
class CommandLineTool extends NodeCommandLineParser_1.NodeCommandLineParser {
    constructor({ toolName, toolDescription }) {
        super(process.argv.slice(2));
        this.actions = [];
        this.actionByName = new Map();
        this.toolName = toolName;
        this.toolDescription = toolDescription;
    }
    /**
     *
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
