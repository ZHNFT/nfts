/**
 * @class NodeCommandLineParser
 *
 * 在这里基础类中，只有解析命令行参数的功能。
 */

type CommandArgs = { _: string[] };

type ParsedOptionArgs = Record<string, string | boolean>;

export type ParsedArgs<T> = T & CommandArgs;

export const argumentsParser = <T>(args: string[]): ParsedArgs<T> => {
  const obj = Object.create(null) as ParsedArgs<T>;

  let option: string;
  let prevFlagName: string;

  obj._ = [] as string[];

  while ((option = args.shift())) {
    if (/^[-]{1,2}\w/.test(option)) {
      if (prevFlagName) {
        obj[prevFlagName] = true;
      }

      prevFlagName = option.startsWith('--')
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
};

type CommandOption = {
  longName: string;
  shortName: string;
  description: string;
};

export class NodeCommandLineParser<T = ParsedOptionArgs> {
  #rawArgs: string[];
  #parsedArgs: ParsedArgs<T>;

  public parser(rawArgs: string[]): ParsedArgs<T> {
    this.#rawArgs = rawArgs;
    this.#parsedArgs = argumentsParser<T>(rawArgs);

    return this.#parsedArgs;
  }

  public get raw(): string[] {
    return this.#rawArgs;
  }

  /**
   * @description 添加命令行参数，这里添加的使一些通用的命令行参数，所有的action都可以配置
   * @param optionName
   *
   * @example
   *
   * nclp.addCommandOption([
   *  {
   *    longName: "--clean",
   *    shortName: "-c",
   *    description: "xxxx"
   *  },
   *  {
   *    longName: "--verbose",
   *    shortName: "-v",
   *    description: "xxxx"
   *  },
   *  ......
   * ])
   *
   */
  addCommandOption(options: CommandOption[]) {
    //
  }
}
