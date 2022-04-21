import * as os from 'os';
import { DateEx } from '@nfts/node-utils-library';
const MAX_LOG_COUNTS = 1000;

export class Debug {
  public static readonly instance = Debug.getScopedLogger('');
  public static readonly logsByScopeName: Map<string, string[]> = new Map();

  public readonly scope: string;

  public static getScopedLogger(name: string): Debug {
    return new Debug(name);
  }

  protected constructor(scope: string) {
    this.scope = scope;
  }

  private _addLogToSharedLogsPool(logMessage: string, time: Date) {
    const logsInScope = Debug.logsByScopeName.get(this.scope) ?? [];
    if (logsInScope && logsInScope.length === MAX_LOG_COUNTS) {
      logsInScope.shift();
    }
    logsInScope.push(`[${DateEx.format(time)}] ${logMessage}`);
    Debug.logsByScopeName.set(this.scope, logsInScope);
  }

  /**
   *
   * @param message
   */
  log(message: string): void {
    /*
      TODO 换个文本输出的方式？
    */
    process.stdout.write(message + os.EOL);
    this._addLogToSharedLogsPool(message + os.EOL, new Date());
  }
}
