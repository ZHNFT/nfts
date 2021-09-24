/**
 * @class Logger
 */

export class Logger {
  public log(msg: string): void {
    console.log(`[${new Date().toLocaleTimeString()}]`, msg);
  }
}
