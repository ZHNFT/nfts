"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTest = void 0;
const node_command_line_1 = require("@gmf/node-command-line");
class ActionTest extends node_command_line_1.ActionBase {
    constructor() {
        super({
            name: 'test'
        });
    }
}
exports.ActionTest = ActionTest;
