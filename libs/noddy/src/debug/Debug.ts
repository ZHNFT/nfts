import * as os from 'os';

export interface LoggerOpts {
  timestamp?: boolean;
  scopePrefix?: boolean;
}

export class Debug {
  private static MAX_LOG_COUNTS = 1000;

  public static readonly instance = Debug.getScopedLogger('');
  public static readonly logsByScopeName: Map<string, string[]> = new Map();

  public readonly scope: string;
  public readonly loggerOpts: LoggerOpts;

  public static getScopedLogger(name: string, opts: LoggerOpts = {}): Debug {
    return new Debug(name, opts);
  }

  protected constructor(scope: string, ots: LoggerOpts) {
    this.scope = scope;
    this.loggerOpts = ots;
  }

  private _addLogToSharedLogsPool(logMessage: string) {
    const logsInScope = Debug.logsByScopeName.get(this.scope) ?? [];
    if (logsInScope && logsInScope.length === Debug.MAX_LOG_COUNTS) {
      logsInScope.shift();
    }
    logsInScope.push(`${logMessage}`);
    Debug.logsByScopeName.set(this.scope, logsInScope);
  }

  private _messageAfterDecorator(msg: string): string {
    if (this.loggerOpts.scopePrefix) {
      msg = `[${this.scope}] ${msg}`;
    }

    if (this.loggerOpts.timestamp) {
      // TODO add timestamp for each log
    }

    return msg;
  }

  /**
   *
   * @param message
   */
  log(message: string): void {
    /*
      TODO 换个文本输出的方式？
    */
    const _msg = this._messageAfterDecorator(message);
    process.stdout.write(_msg + os.EOL);
    this._addLogToSharedLogsPool(_msg + os.EOL);
  }
}
