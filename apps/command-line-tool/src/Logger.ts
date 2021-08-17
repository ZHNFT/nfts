export interface LoggerOptions {
  verbose: boolean;
  enableTimeSummary: boolean;
}

class Timer {
  #_ms: number
  #_interval: number

  get interval() {
    return this.#_interval
  }

  start() {
    this.#_ms = new Date().getTime()
  }

  end() {
    this.#_interval = new Date().getTime() - this.#_ms;
  }
}

export default class Logger {
  readonly #_timer: Timer
  readonly #_options: LoggerOptions;

  constructor(
    options: LoggerOptions
  ) {
    this.#_options = options;
    this.#_timer = new Timer();
  }

  get options() {
    return this.#_options
  }

  /**
   * @description 计算方法执行完成之后的时间
   * @param func
   *
   * @public
   */
  async logCallbackTime(
    callback: Function
  ) {
    this.#_timer.start();
    this.#_timer.end();

    console.log(this.#_timer.interval)
  }
}
