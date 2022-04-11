export class Logger {
  private readonly _scope: string;
  private _devMode: boolean;

  private static readonly _loggers: Logger[];
  private static readonly _defaultLogger = Logger.getLogger('__default__');

  get scope(): string {
    return this._scope;
  }

  set devMode(devMode: boolean) {
    this._devMode = devMode;
  }

  protected constructor(scope: string, devMode = true) {
    this._scope = scope;
    this._devMode = devMode;
  }

  public static getLogger(scope?: string): Logger {
    if (!scope) {
      return Logger._defaultLogger;
    }

    let logger = this._loggers.find(logger => logger.scope === scope);

    if (logger) {
      return logger;
    }

    logger = Logger.getLogger(scope);

    this._loggers.push(logger);

    return logger;
  }

  public log(msg: string): void {
    // TODO replace console.log method
    console.log(`[${this._scope}]`, msg);
  }
}
