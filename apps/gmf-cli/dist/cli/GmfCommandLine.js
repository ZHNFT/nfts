"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmfCommandLine = void 0;
const node_command_line_1 = require("@gmf/node-command-line");
const ActionBuild_1 = require("./framework/actions/ActionBuild");
class GmfCommandLine extends node_command_line_1.CommandLineTool {
    //
    constructor() {
        super({
            toolName: 'gmf',
            toolDescription: 'gmf personal use only!!!'
        });
        const build = new ActionBuild_1.ActionBuild();
        this.addAction(build);
    }
}
exports.GmfCommandLine = GmfCommandLine;
