export abstract class OptionBase {
  private readonly _name: string;

  get name(): string {
    return this._name;
  }
}
