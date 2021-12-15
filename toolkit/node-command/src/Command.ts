import { ICommandAction } from './CommandAction';

export type IActionConfig = {
  name: string;
};

export abstract class ICommand<T> {
  readonly commandName: string;
  readonly commandActions: Map<string, ICommandAction<T>>;
  abstract addAction(action: ICommandAction<T>): void;
  abstract getAction(actionName: string): ICommandAction<T>;

  /**
   * @description 触发操作
   * */
  abstract invokeAction(): void;
}

export class Command<T> implements ICommand<T> {
  commandName: string;
  commandDescription: string;
  commandActions: Map<string, ICommandAction<T>>;

  constructor({
    commandName,
    commandDescription
  }: {
    commandName: string;
    commandDescription: string;
  }) {
    this.commandName = commandName;
    this.commandDescription = commandDescription;
    this.commandActions = new Map<string, ICommandAction<T>>();
  }

  getAction(actionName: string): ICommandAction<T> {
    return this.commandActions.get(actionName);
  }

  addAction(action: ICommandAction<T>): void {
    this.commandActions.set(action.actionName, action);
  }

  invokeAction(): void {
    //
  }
}
