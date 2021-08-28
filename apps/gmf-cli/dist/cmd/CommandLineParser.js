"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLineParser = void 0;
const node_command_line_1 = require("@gmf/node-command-line");
const actions_1 = require("./tools/actions");
class CommandLineParser extends node_command_line_1.NodeCommandLine {
    constructor() {
        super({
            toolName: 'gmf-cli',
            toolDescription: 'Show me the money'
        });
        const build = new actions_1.ActionBuild();
        const context = {
            build: build.plugins.initializePlugins()
        };
    }
}
exports.CommandLineParser = CommandLineParser;
