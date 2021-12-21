export enum ParameterKinds {
  'string' = 'string',
  'number' = 'number',
  'boolean' = 'boolean',
  'array' = 'array'
}

export type TParameterKinds = keyof typeof ParameterKinds;

export abstract class ParameterDefinitionBase {
  private _value: unknown;

  name: string;
  shortName: string;
  required: boolean;
  kind: TParameterKinds;

  get value() {
    return this._value;
  }

  set value(_: unknown) {
    throw Error(`Unable to set readonly value`);
  }

  constructor(name: string, shortName: string, required: boolean) {
    this.name = name;
    this.shortName = shortName;
    this.required = required;
  }

  setValue(value: string) {
    const _kind = this.kind;

    if (!_kind) {
      console.warn(`Undetermined kind for option name: --${this.name}`);
    }

    let _value: unknown;

    try {
      switch (_kind) {
        case 'number':
          _value = Number(value);
          break;
        case 'boolean':
          _value = Boolean(value);
          break;
        case 'array':
          _value = value.split(',');
        default:
          _value = value;
          break;
      }
    } catch (error) {}

    this._value = _value;
  }
}
