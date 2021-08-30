"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLineParser = void 0;
const node_command_line_1 = require("@gmf/node-command-line");
const actions_1 = require("./tools/actions");
const Lifecycle_1 = require("./tools/Lifecycle");
class CommandLineParser extends node_command_line_1.NodeCommandLine {
    constructor() {
        super({
            toolName: 'gmf-cli',
            toolDescription: 'Show me the money'
        });
        const lifecycle = new Lifecycle_1.Lifecycle();
        const build = new actions_1.ActionBuild();
        const test = new actions_1.ActionTest();
        const esm = new actions_1.ActionEsm();
        const context = {
            build: build.plugins.initializePlugins(),
            test: test.plugins.initializePlugins(),
            esm: esm.plugins.initializePlugins()
        };
    }
}
exports.CommandLineParser = CommandLineParser;
