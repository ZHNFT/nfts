"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionBuild = void 0;
const node_command_line_1 = require("@gmf/node-command-line");
class ActionBuild extends node_command_line_1.ActionBase {
    constructor() {
        super({ name: 'build' });
    }
}
exports.ActionBuild = ActionBuild;
