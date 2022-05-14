import { Utils } from '../utils/Utils';

export enum ParameterTypes {
  Array = 'Array',
  String = 'String',
  Flag = 'Flag'
}

export interface IParameterDefinition {
  /*
   * 名称
   * */
  readonly name: string;
  /*
   * 参数类型
   * */
  readonly type: string;
  /*
   * 参数说明
   * */
  readonly summary: string;
  /*
   * 参数是否必填
   * */
  readonly required?: boolean;
  /*
   * 参数短名称
   * */
  readonly shortName?: string;
  /*
   * 参数指定后激活的回调方法
   * */
  readonly callback?: (args: unknown) => void | Promise<void>;
}

export abstract class ParameterDefinition implements IParameterDefinition {
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly summary: string;
  readonly shortName?: string;
  readonly callback?: (args: unknown) => void | Promise<void>;

  get strippedName(): string {
    return this.name.replace(/^-{1,2}/, '');
  }

  get strippedShortName(): string {
    if (!this.shortName) {
      throw new Error(`shortName is not defined`);
    } else {
      return this.shortName?.replace(/^-{1,2}/, '');
    }
  }

  protected constructor(definition: IParameterDefinition) {
    this.name = definition.name;
    this.type = definition.type;
    this.required = definition.required ?? false;
    this.summary = definition.summary;
    this.shortName = definition.shortName;
    this.callback = definition.callback;

    if (!Utils.hasParamFlagPrefix(this.name)) {
      throw new Error(`Illegal option name "${this.name}"` + `expect option name start with "-" or "--"`);
    }
  }
}
