"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionEsm = void 0;
const node_command_line_1 = require("@gmf/node-command-line");
class ActionEsm extends node_command_line_1.ActionBase {
    constructor() {
        super({
            name: 'esm'
        });
    }
}
exports.ActionEsm = ActionEsm;
