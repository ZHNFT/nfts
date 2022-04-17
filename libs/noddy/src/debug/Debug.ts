import * as process from 'process';

export class Debug {
  public readonly scope: string;

  public static getScopedLogger(name: string): Debug {
    return new Debug(name);
  }

  protected constructor(scope: string) {
    this.scope = scope;
  }

  /**
   *
   * @param message
   */
  log(message: string): void {
    process.stdout.write(message);
  }
}
