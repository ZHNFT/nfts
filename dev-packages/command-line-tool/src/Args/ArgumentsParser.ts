interface CommandOptionType {
  option: string;
  shortOption: string;
  description: string;
  validator?: (optionValue: string) => Promise<void>;
}

export default class ArgumentsParser {
  /**
   *
   * @private
   */
  #_rawArguments: string[] = [];

  /**
   *
   * @private
   */
  #_parsedArguments: string[] = [];

  /**
   *
   * @private
   */
  #_argumentsOptions: CommandOptionType[] = [];

  constructor() {
    //
  }

  /**
   * @description 添加命令行参数
   * @param option
   * @param shortOption
   * @param description
   */
  addOption({
    option,
    shortOption,
    description
  }: CommandOptionType): ArgumentsParser {
    this.#_argumentsOptions.push({
      option,
      shortOption,
      description
    });

    return this;
  }

  /**
   * @description 命令行参数解析
   *
   * @private
   */
  _parse() {}

  /**
   * @description 校验参数是否有问题
   *
   * @public
   */
  validate() {
    return Promise.all(
      this.#_argumentsOptions.map(async (argOptions) => {
        return argOptions?.validator?.('');
      })
    );
  }

  /**
   * @description 输出注册参数的说明
   *
   * @public
   */
  help() {
    //
    console.log('help me!!!');
  }
}
