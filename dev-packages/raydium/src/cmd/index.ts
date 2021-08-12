import { CommandManager, TerminalManager } from '@raydium/command-line-tool';
import { TerminalProvider } from 'src/cmd/provider/TerminalProvider';

export class CommandLineParser extends CommandManager {
  private readonly _terminal: TerminalManager;

  constructor() {
    super({ name: 'raydium', description: 'raydium for dev' });

    this._terminal = new TerminalManager({
      provider: new TerminalProvider(),
      verbose: true,
      timer: true
    });
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
}
