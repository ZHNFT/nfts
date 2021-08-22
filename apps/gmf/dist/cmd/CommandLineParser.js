"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLineParser = void 0;
const command_line_tool_1 = require("@raydium/command-line-tool");
const EsmAction_1 = require("./actions/EsmAction");
const GmfConfiguration_1 = require("./base/GmfConfiguration");
const GmfInternalPhase_1 = require("./base/GmfInternalPhase");
const process = require("process");
class CommandLineParser extends command_line_tool_1.CommandLineTool {
    constructor() {
        super({
            name: 'gmf',
            description: 'gmf good good good good good !!!'
        });
        const { verbose, enableTimeSummary } = command_line_tool_1.ArgumentsParser.parser(process.argv);
        this.argsParser = new command_line_tool_1.ArgumentsParser({ name: 'gmf' });
        this.terminal = new command_line_tool_1.TerminalProvider({ name: 'gmf' });
        this.logger = new command_line_tool_1.Logger({
            verbose,
            enableTimeSummary
        });
        this.gmfConfig = new GmfConfiguration_1.GmfConfiguration({
            name: 'gmf.json',
            description: ''
        });
        const initOptions = {
            gmfConfig: this.gmfConfig,
            gmfTerminal: this.terminal,
            gmfLog: this.logger
        };
        this.internalPhase = new GmfInternalPhase_1.GmfInternalPhase(initOptions);
        /// 添加操作
        const esmAction = new EsmAction_1.EsmAction();
        this.internalPhase.registerAction(esmAction);
    }
    prepare() {
        //
        const { plugins } = command_line_tool_1.ArgumentsParser.parser(process.argv.slice(2));
        if (plugins && typeof plugins === 'string') {
            const pluginNames = plugins.split(',');
            this.pluginsFromCommandLineOptions = pluginNames;
        }
    }
    async exec() {
        //
        const { _ } = command_line_tool_1.ArgumentsParser.parser(process.argv.slice(2));
        const action = _[0];
        try {
            this.internalPhase.getActionByName(action);
        }
        catch (e) {
            // 没有获取到注册的Action
        }
    }
}
exports.CommandLineParser = CommandLineParser;
