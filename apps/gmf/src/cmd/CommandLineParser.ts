import {
  CommandLineTool,
  ArgumentsParser,
  TerminalProvider,
  Logger
} from '@raydium/command-line-tool';
import { EsmAction } from './actions/EsmAction';
import { GmfConfiguration } from './base/GmfConfiguration';
import {
  GmfInternalPhase,
  IGmfInternalPhaseInitOptions
} from './base/GmfInternalPhase';
import * as process from 'process';

export class CommandLineParser extends CommandLineTool {
  argsParser: ArgumentsParser;
  logger: Logger;
  terminal: TerminalProvider;

  gmfConfig: GmfConfiguration;
  internalPhase: GmfInternalPhase;

  pluginsFromCommandLineOptions: string[];

  constructor() {
    super({
      name: 'gmf',
      description: 'gmf good good good good good !!!'
    });

    const { verbose, enableTimeSummary } = ArgumentsParser.parser<{
      verbose: boolean;
      debug: boolean;
      enableTimeSummary: boolean;
    }>(process.argv);

    this.argsParser = new ArgumentsParser({ name: 'gmf' });
    this.terminal = new TerminalProvider({ name: 'gmf' });
    this.logger = new Logger({
      verbose,
      enableTimeSummary
    });

    this.gmfConfig = new GmfConfiguration({ name: 'gmf.json' });

    const initOptions: IGmfInternalPhaseInitOptions = {
      gmfConfig: this.gmfConfig,
      gmfTerminal: this.terminal,
      gmfLog: this.logger
    };

    this.internalPhase = new GmfInternalPhase(initOptions);

    /// 添加操作
    const esmAction = new EsmAction(this.gmfConfig);

    this.internalPhase.registerAction(esmAction);
  }

  /**
   * @public
   */
  public prepare(): CommandLineParser {
    //
    const { plugins } = ArgumentsParser.parser<{ plugins: string }>(
      process.argv.slice(2)
    );

    if (plugins && typeof plugins === 'string') {
      const pluginNames = plugins.split(',');
      this.pluginsFromCommandLineOptions = pluginNames;
    }

    return this;
  }

  async exec(): Promise<void> {
    //
    const { _ } = ArgumentsParser.parser<{ _: string[] }>(
      process.argv.slice(2)
    );

    const action = _[0];

    try {
      this.internalPhase.getActionByName(action);
    } catch (e) {
      // 没有获取到注册的Action
    }
  }
}
