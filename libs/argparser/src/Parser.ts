import { CommandBase } from './Command';
import * as Events from 'events';
import * as process from 'process';

interface ParserOptions {
  allowUnknownOptions: boolean;
  showHelpAfterError: boolean;
}

export class Parser extends Events.EventEmitter {
  readonly _version: string;
  readonly _command: CommandBase;

  readonly _defaultOpts: ParserOptions = {
    allowUnknownOptions: true,
    showHelpAfterError: true
  };
  private _opts: ParserOptions;
  private _internal: {
    write: (buf: string) => boolean;
    writeError: (buf: string) => boolean;
  };

  constructor(opts: Partial<ParserOptions>) {
    super();

    this._getInternal();
    this._getOptions(opts);
  }

  public parse(args: string[]) {
    //
  }

  private _getInternal() {
    this._internal = {
      write: (buf: string) => process.stdout.write(buf),
      writeError: (buf: string) => process.stderr.write(buf)
    };
  }

  private _getOptions(opts: Partial<ParserOptions>): ParserOptions {
    this._opts = Object.assign({}, this._defaultOpts, opts);
    return this._opts;
  }
}
