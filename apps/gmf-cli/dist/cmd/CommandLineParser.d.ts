import { NodeCommandLine, CLICommandParsedArgs } from '@gmf/node-command-line';
import { GmfConfig, PluginManager } from './tools/PluginManager';
import { Config } from './tools/Config';
export declare class CommandLineParser extends NodeCommandLine {
    _pluginManager: PluginManager;
    _config: Config<GmfConfig>;
    _cliArgs: CLICommandParsedArgs;
    _execCommand: string;
    constructor();
    prepare(): CommandLineParser;
}
