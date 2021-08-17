import Logger from '@raydium/command-line-tool/Logger';

interface CommandLineInfo {
  name: string;
  description: string;
}

interface CommandLineParserResult<T extends Record<string, string>> {
  _: string[];
  // [key: keyof T]: string;
}

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
  }

  _parser(rawOptions: string[]) {
    const obj = Object.create(null);

    let noFlags: string[] = [];
    let option: string;
    let isFlag = false, // 当前是否是标识
      prevFlagName: string; // 前一个option是否是标识

    obj._ = [];

    while ((option = rawOptions.shift())) {
      if ((isFlag = OPTION_NAME_REGEXP.test(option))) {
        if (!prevFlagName) {
          obj[prevFlagName] = true;
        }

        prevFlagName = option.replace('--', '');
      } else {
        if (!prevFlagName) {
          obj._.push(option);
          continue;
        }

        if (prevFlagName) {
          obj[prevFlagName] = option;
        }

        prevFlagName = '';
      }
    }
  }
}
