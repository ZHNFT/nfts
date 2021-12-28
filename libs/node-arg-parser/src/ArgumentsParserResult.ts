import { ArgumentsParserError } from './ArgumentsParserError';

export interface IArgumentsParserResult {
  command: string;
  subCommands: Set<string>;
  params: Record<string, string>;
}

export class ArgumentsParserResult implements IArgumentsParserResult {
  command: string;
  subCommands: Set<string>;

  errors: ArgumentsParserError[];

  /**
   * 解析出来的参数对象；一旦解析完成，参数对象将被冻结，无法通过setParamValueByName更新；
   * @type {}
   */
  params: Record<string, string> = Object.create(null);

  /**
   * 设置param值；
   * @param paramName
   * @param value
   */
  public setParamValueByName(paramName: string, value: string) {
    this.params[paramName] = value;
  }

  /**
   * 获取param的值；
   * @param paramName
   */
  public getParamValueByName(paramName: string): string {
    return this.params[paramName];
  }

  /**
   * paramName是否存在与解析好的参数表中；
   * @param paramName
   */
  public hasParam(paramName: string) {
    return Object.prototype.hasOwnProperty.call(this.params, paramName);
  }

  /**
   * 设置command名称
   * @param commandName
   */
  public setCommand(commandName: string) {
    this.command = commandName;
  }

  public addSubCommands(commandName: string) {
    if (this.subCommands.has(commandName)) {
      this.errors.push(new ArgumentsParserError(`SubCommandName: ${commandName} is already defined`));
      // todo Throw Error?
    }
    this.subCommands.add(commandName);
  }

  /**
   * 冻结params对象，使其无法再次被更新；
   */
  private _frozen() {
    this.params = Object.freeze(this.params);
  }
}
