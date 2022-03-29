import { Parser } from '@nfts/argparser';
import Action from './Action';

export interface ICommandToolInitOption {
  toolName: string;
  toolDescription: string;
}

export default abstract class CommandTool {
  protected _toolName: string;
  protected _toolDescription: string;
  protected _parser: Parser;

  protected constructor({ toolName, toolDescription }: ICommandToolInitOption) {
    this._toolName = toolName;
    this._toolDescription = toolDescription;
    this._parser = new Parser({
      name: toolName,
      description: toolDescription
    });
  }

  protected addAction(action: Action) {
    this._parser.addSubParser(action.parser);
  }

  protected async exec(): Promise<void> {
    await this._parser.parse();
  }
}
