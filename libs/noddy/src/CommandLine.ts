import { Command as CommandParser } from '@ntfs/argparser';
import { Argument } from './classes/ArgumentClasses';
import { Hooks } from './Hooks';

export abstract class CommandLine {
  private _name: string;
  private _description: string;

  protected _parser: CommandParser;
  protected _hook: Hooks<unknown>;

  protected constructor({ name, description }: { name: string; description: string }) {
    this._name = name;
    this._description = description;
    this._hook = new Hooks();
    this._parser = CommandParser.command(name, description);
  }

  protected addArg(arg: Argument): void {
    this._parser
      .argument({
        name: arg.name,
        description: arg.description
      })
      .callback(arg.exec);
  }
}
