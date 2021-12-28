import { ParameterDefinitionBase } from '../parameters';

export type TCommandLineInitOption = {
  commandName: string;
  commandDescription: string;
};

export abstract class BaseCommand {
  readonly commandName: string;
  readonly commandDescription: string;

  _parameters: Map<string, ParameterDefinitionBase>;

  /**
   * @description 定义Command参数
   */
  abstract defineParameter(): void;

  protected constructor(opts: TCommandLineInitOption) {
    this.commandName = opts.commandName;
    this.commandDescription = opts.commandDescription;
  }
}
