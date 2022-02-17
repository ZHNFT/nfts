export class Option {
  private readonly _name: string;
  private readonly _description: string;

  constructor({ name, description }: { name: string; description: string }) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  set name(_: string) {
    throw Error('如果想修改Option的name字段。请考虑重新创建一个Option实例。');
  }

  get description(): string {
    return this._description;
  }

  set description(_: string) {
    throw Error('如果想修改Option的description字段。请考虑重新创建一个Option实例。');
  }
}
