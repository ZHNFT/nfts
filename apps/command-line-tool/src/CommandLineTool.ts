import Logger from '@raydium/command-line-tool/Logger';

interface CommandLineInfo {
  name: string;
  description: string;
}

type Spread<T> = {
  [P in keyof T]: T[P];
};

const SHORT_NAME_REGEXP = /^-\w+/;
const LONG_NAME_REGEXP = /^--\w+/;
const OPTION_NAME_REGEXP = /^[-]{1,2}\w/;

export default class CommandLineTool {
  readonly #_name: string;
  readonly #_description: string;
  readonly #_logger: Logger;

  #_bin: string;
  #_executedFile: string;

  constructor({ name, description }: CommandLineInfo) {
    this.#_name = name;
    this.#_description = description;
    this.#_logger = new Logger({
      enableTimeSummary: true,
      verbose: true
    });
  }

  get name() {
    return this.#_name;
  }

  get description() {
    return this.#_description;
  }

  /**
   * @description 解析命令行输入
   * @public
   */
  process() {
    const args = process.argv;

    const [bin, executedFile, ...options] = args;

    this.#_bin = bin;
    this.#_executedFile = executedFile;
    this._parser(options);
  }

  _parser<T extends Record<string, unknown>>(
    rawOptions: string[]
  ): { _: string[] } & Spread<T> {
    const obj = Object.create(null);

    let noFlags: string[] = [];
    let option: string;
    let isFlag = false, // 当前是否是标识
      prevFlagName: string; // 前一个option是否是标识

    obj._ = [] as string[];

    while ((option = rawOptions.shift())) {
      if (OPTION_NAME_REGEXP.test(option)) {
        if (prevFlagName) {
          obj[prevFlagName] = true;
        }

        prevFlagName = LONG_NAME_REGEXP.test(option)
          ? option.replace('--', '')
          : option.replace('-', '');
      } else {
        if (prevFlagName) {
          obj[prevFlagName] = option;
        } else {
          obj._.push(option);
        }

        prevFlagName = '';
      }
    }

    return obj;
  }
}
