export enum ParameterKinds {
  'string' = 'string',
  'number' = 'number',
  'boolean' = 'boolean'
}

export type TParameterKinds = keyof typeof ParameterKinds;

export abstract class ParameterDefinitionBase {
  abstract kind: TParameterKinds;

  private _value: unknown;

  private name: string;

  private shortName: string;

  private required: boolean;

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

  setValue(value: unknown) {
    this._value = value;
  }
}
