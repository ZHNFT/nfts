"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmfCommandLine = void 0;
const node_command_line_1 = require("@gmf/node-command-line");
const ActionBuild_1 = require("./framework/actions/ActionBuild");
const GmfConfig_1 = require("./framework/GmfConfig");
const PluginManager_1 = require("./framework/PluginManager");
const Logger_1 = require("./framework/Logger");
const process = require("process");
class GmfCommandLine extends node_command_line_1.CommandLineTool {
    constructor() {
        super({
            toolName: 'gmf',
            toolDescription: 'gmf personal use only!!!'
        });
        const logger = new Logger_1.Logger();
        const config = new GmfConfig_1.GmfConfig({
            configFile: './config/gmf.json',
            cwd: process.cwd()
        });
        const build = new ActionBuild_1.ActionBuild();
        this.addCommandOption([
            {
                longName: 'plugin',
                description: 'Add extra command plugin'
            },
            {
                longName: 'clean',
                shortName: 'c',
                description: 'Cleanup build files'
            },
            {
                longName: 'sourcemap',
                description: 'Generate sourcemap files'
            }
        ]);
        const pluginContext = {
            hooks: {
                build: build.initializeHook()
            },
            config,
            logger
        };
        this._pluginManager = new PluginManager_1.PluginManager(pluginContext, config, logger);
        this.addAction(build);
    }
    prepare() {
        return this;
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._pluginManager.invokePlugins();
            const command = this.parser(process.argv.slice(2))._[0];
            this.getAction(command).hook.call(this);
            console.log('exec');
        });
    }
}
exports.GmfCommandLine = GmfCommandLine;
