import { IParamDefinition, ParameterDefinitionBase } from '../parameters';

export interface ICommandLineInitOption {
  subCommandName: string;
  subCommandDescription: string;
}

export abstract class BaseSubCommand {
  readonly subCommandName: string;
  readonly subCommandDescription: string;

  private readonly _parameter: Map<string, ParameterDefinitionBase>;

  protected constructor(opts: ICommandLineInitOption) {
    this.subCommandName = opts.subCommandName;
    this.subCommandDescription = opts.subCommandDescription;
  }

  /**
   * @description 定义SubCommand的参数操作
   *
   * 通过配置读取的参数由此方法进行绑定操作，
   */
  defineParamAction(definition: IParamDefinition): void {
    // this._parameter.set(definition.paramName);
  }
}
