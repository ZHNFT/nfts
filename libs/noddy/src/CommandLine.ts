import { Command as CommandParser } from '@ntfs/argparser';
import { CommandLineOptions } from './CommandLineOptions';
import { IBaseOptionDefinition } from './classes/OptionClasses';
import { Argument } from './classes/ArgumentClasses';

export abstract class CommandLine extends CommandLineOptions {
  private _name: string;
  private _description: string;

  protected _parser: CommandParser;

  protected constructor({ name, description }: { name: string; description: string }) {
    super();

    this._name = name;
    this._description = description;
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
