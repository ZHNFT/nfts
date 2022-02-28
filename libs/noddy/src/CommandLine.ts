import { Command as CommandParser } from '@ntfs/argparser';
import { CommandArgument } from './CommandArgument';

export abstract class CommandLine {
  private _name: string;
  private _description: string;

  protected _parser: CommandParser;

  protected constructor({ name, description }: { name: string; description: string }) {
    this._name = name;
    this._description = description;

    this._parser = new CommandParser({
      name,
      description
    });
  }

  /*
   * 注册argument以及回调函数
   * */
  protected argument(commandArg: CommandArgument) {
    this._parser.argument(commandArg._arg);
    this._parser.callback(commandArg.exec);
  }

  execute() {
    this._parser.parse();
  }
}
