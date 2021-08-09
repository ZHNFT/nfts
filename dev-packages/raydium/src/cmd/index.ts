import { CommandManager, TerminalManager } from '@raydium/command-line-tool';
import { PluginManager } from 'src/plugins/PluginManager';
import { ArgumentsParser } from 'src/cmd/arguments/ArgumentsParser';

export class CommandLineParser extends CommandManager {
  private readonly _terminal: TerminalManager;
  private readonly _pluginManager: PluginManager;
  private readonly _argumentsParser: ArgumentsParser;

  constructor() {
    super({
      commandName: 'raydium',
      commandDescription: 'raydium for dev'
    });

    this._terminal = new TerminalManager();
    this._pluginManager = new PluginManager();
    this._argumentsParser = new ArgumentsParser();
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
