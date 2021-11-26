import { ICommandAction } from './CommandAction';

export type IActionConfig = {
  name: string;
};

export interface ICommand<T> {
  readonly commandName: string;
  readonly commandActions: Map<string, ICommandAction<T>>;

  addAction(action: ICommandAction<T>): void;

  getAction(actionName: string): ICommandAction<T>;
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

  getAction(actionName: string) {
    return this.commandActions.get(actionName);
  }

  addAction(action: ICommandAction<T>) {
    this.commandActions.set(action.name, action);
  }
}
