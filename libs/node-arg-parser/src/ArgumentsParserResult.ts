import { ArgumentsParserError } from './ArgumentsParserError';

export type TGoodValueType = string;

export interface IArgumentsParserResult {
  getCommand(): string;
  setCommand(command: string): void;

  getSubCommands(): string[];
  addSubCommand(subCommand: string): void;

  getValueByParamName(paramName: string): TGoodValueType;
  setValueByParamName(paramName: string, value: TGoodValueType): void;
}

export class ArgumentsParserResult implements IArgumentsParserResult {
  private _command: string;
  private readonly _subCommands: Set<string>;
  private readonly _errors: ArgumentsParserError[];
  /**
   * 解析出来的参数对象；一旦解析完成，参数对象将被冻结，无法通过setParamValueByName更新；
   */
  private readonly _params: Map<string, TGoodValueType> = new Map<string, TGoodValueType>();

  constructor() {
    this._subCommands = new Set<string>();
    this._params = new Map<string, TGoodValueType>();
    this._errors = [];
  }

  get command(): string {
    return this._command;
  }

  set command(_: unknown) {
    throw new ArgumentsParserError(`command field in ArgumentsParserResult can not be set directly`);
  }

  public hasParam(paramName: string): boolean {
    return this._params.has(paramName);
  }

  public setCommand(commandName: string): void {
    this._command = commandName;
  }

  public getCommand = (): string => this._command;

  public addSubCommand(subCommand: string): void {
    if (this._subCommands.has(subCommand)) {
      this._errors.push(new ArgumentsParserError(`SubCommandName: ${subCommand} is already defined`));
    }
    this._subCommands.add(subCommand);
  }
  public getSubCommands = (): string[] => Array.from(this._subCommands);

  public setValueByParamName = (paramName: string, value: TGoodValueType) => this._params.set(paramName, value);
  public getValueByParamName = (paramName: string): TGoodValueType => this._params.get(paramName);
}
