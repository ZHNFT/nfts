import { CommandManager, TerminalManager } from '@raydium/command-line-tool';
import { PluginManager } from 'src/plugins/PluginManager';
import { TerminalProvider } from 'src/cmd/provider/TerminalProvider';
import { ArgumentsProvider } from 'src/cmd/provider/ArgumentsProvider';

export class CommandLineParser extends CommandManager {
  private readonly _terminal: TerminalManager;
  private readonly _pluginManager: PluginManager;
  private readonly _argumentsParser: ArgumentsProvider;

  constructor() {
    super({ name: 'raydium', description: 'raydium for dev' });

    this._terminal = new TerminalManager({
      provider: new TerminalProvider(),
      verbose: true,
      timer: true
    });
    this._pluginManager = new PluginManager();
    this._argumentsParser = new ArgumentsProvider();
  }

  public get terminal(): TerminalManager {
    return this._terminal;
  }

  /**
   * @public
   *
   */
  public parser(): CommandLineParser {
    return this;
  }

  /**
   * @public
   *
   */
  public async execute() {}

  /**
   *
   * Prepare configurations and necessary instance
   *
   * @private
   *
   */
  private async _prepareCommand(command: string): Promise<void> {}
}
