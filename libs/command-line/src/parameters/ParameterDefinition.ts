export enum ParameterKinds {
  'STRING' = 'STRING',
  'BOOLEAN' = 'BOOLEAN',
  'ARRAY' = 'ARRAY',
  'INTEGER' = 'INTEGER'
}

export type TParameterKinds = keyof typeof ParameterKinds;

export interface IParamDefinition {
  /**
   *
   */
  paramName: string;
  paramShortName?: string;
  paramDescription: string;
  /**
   * @desc 参数是否必须
   */
  require: boolean;
  /**
   * @desc 参数类型
   */
  kind: TParameterKinds;
  //
  //
  /**
   * @desc 参数对应的操作方法；
   *       参数的具体逻辑由action执行；
   */
  paramAction: string;
}

export abstract class ParameterDefinitionBase implements IParamDefinition {
  private _value: unknown;

  paramName: string;
  paramShortName?: string;
  paramDescription: string;
  required: boolean;
  kind: TParameterKinds;

  get value() {
    return this._value;
  }

  set value(_: unknown) {
    throw Error(`Unable to set readonly value`);
  }

  constructor(opts: IParamDefinition) {
    this.paramName = opts.paramName;
    this.paramShortName = opts.paramShortName;
    this.paramDescription = opts.paramDescription;
    this.required = opts.require;
  }

  require: boolean;
  paramAction: string;

  setValue(value: string) {
    const _kind = this.kind;

    if (!_kind) {
      console.warn(`Undetermined kind for option name: --${this.paramName}`);
    }

    let _value: unknown;

    try {
      switch (_kind) {
        case ParameterKinds.INTEGER:
          _value = Number(value);
          break;
        case ParameterKinds.BOOLEAN:
          _value = Boolean(value);
          break;
        case ParameterKinds.ARRAY:
          _value = value.split(',');
        default:
          _value = value;
          break;
      }
    } catch (e) {
      console.error(e);
    }

    this._value = _value;
  }
}
