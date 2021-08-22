import { CommandLineTool, ArgumentsParser, TerminalProvider, Logger } from '@raydium/command-line-tool';
import { GmfConfiguration } from './base/GmfConfiguration';
import { GmfInternalPhase } from './base/GmfInternalPhase';
export declare class CommandLineParser extends CommandLineTool {
    argsParser: ArgumentsParser;
    logger: Logger;
    terminal: TerminalProvider;
    gmfConfig: GmfConfiguration;
    internalPhase: GmfInternalPhase;
    pluginsFromCommandLineOptions: string[];
    constructor();
    prepare(): void;
    exec(): Promise<void>;
}
