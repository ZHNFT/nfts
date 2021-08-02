import { CommandManager, TerminalManager } from '@raydium/command-line-tool';
import { Command, CommandDescription } from '../constants/CommandNames';

export class CommandLineParser extends CommandManager {
  private readonly _terminal: TerminalManager;

  constructor() {
    super({
      commandName: Command,
      commandDescription: CommandDescription
    });

    this._terminal = new TerminalManager();
  }

  get terminal(): TerminalManager {
    return this._terminal;
  }

  /**
   * @public
   *
   */
  execute() {}

  /**
   *
   * Prepare configurations and necessary instance
   *
   * @private
   *
   */
  async _prepareCommand(command: string): Promise<void> {}
}
