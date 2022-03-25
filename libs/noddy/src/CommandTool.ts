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
  protected _actionByName: Map<string, Action> = new Map();

  protected constructor({ toolName, toolDescription }: ICommandToolInitOption) {
    this._toolName = toolName;
    this._toolDescription = toolDescription;
    this._parser = new Parser({
      name: toolName,
      description: toolDescription
    });
  }

  public addAction(action: Action): void {
    this._parser.addParser(action.actionParser);
    this._actionByName.set(action.actionName, action);
  }

  protected async exec(): Promise<void> {
    this._parser.parse();
    const { _ } = this._parser.options<{ _: string }>();
    const action = this._actionByName.get(_);

    if (!action) {
      throw new Error(`Action <${_}> is not defined`);
    }

    await action.onExecute();
    return;
  }
}
