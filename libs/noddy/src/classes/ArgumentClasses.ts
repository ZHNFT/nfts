import { IBaseArgument, Command as CommandParser } from '@ntfs/argparser';

export interface IArgument extends IBaseArgument {}

export abstract class Argument implements IArgument {
  readonly description: string;
  readonly name: string;

  private readonly _parser: CommandParser;

  protected constructor(definition: IBaseArgument & { parser: CommandParser }) {
    this.name = definition.name;
    this.description = definition.description;
    this._parser = definition.parser;
  }

  public _addArg() {
    this._parser.argument({
      name: this.name,
      description: this.description
    });
  }

  /* 子类/实现类需要自己实现执行方法 */
  abstract exec(): void;
}
