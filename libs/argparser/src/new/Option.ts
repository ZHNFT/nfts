import { TBaseDefinition } from './Command';

export class Option implements TBaseDefinition {
  private readonly _name: string;
  readonly description: string;

  readonly belongTo: string;
  readonly required: boolean;

  get name(): string {
    return this._name;
  }

  set name(_: string) {
    throw Error("Don't set a readonly value");
  }

  public static mybeOption(optionName: string): boolean {
    return /^-{1,2}([a-z-]+)/.test(optionName);
  }

  constructor({
    name,
    description,
    belongTo,
    required
  }: TBaseDefinition & { belongTo: string; required: boolean }) {
    this._name = name;
    this.description = description;
    this.required = required;
    this.belongTo = belongTo;
  }
}
