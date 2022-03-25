import { Parser } from '@nfts/argparser';
import Action from './Action';

export interface ICommandToolInitOption {
  toolName: string;
  toolDescription: string;
}

export default class CommandTool extends Parser {
  private _actionByName: Map<string, Action> = new Map();

  constructor({ toolName, toolDescription }: ICommandToolInitOption) {
    super({
      name: toolName,
      description: toolDescription
    });
  }

  public addAction(action: Action): void {
    this.addParser(action.actionParser);
    this._actionByName.set(action.actionName, action);
  }

  protected async _exec(): Promise<void> {
    this.parse();
    const { _ } = this.options<{ _: string }>();
    const action = this._actionByName.get(_);

    if (!action) {
      throw new Error(`Action <${_}> is not defined`);
    }

    await action.onExecute();
    return;
  }
}
