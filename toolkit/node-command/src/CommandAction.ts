export type ActionFunc<T> = (args: T) => void;

export abstract class ICommandAction<T> {
  name: string;
  description: string;

  hooks: Record<string, () => void[]>;

  abstract applyAction(ctx: T): void;
}

export class CommandAction<T> implements ICommandAction<T> {
  name: string;
  description: string;

  hooks: Record<string, () => void[]>;

  constructor({
    actionName,
    actionDescription
  }: {
    actionName: string;
    actionDescription: string;
  }) {
    this.name = actionName;
    this.description = actionDescription;

    this.hooks = {};
  }

  applyAction(ctx: T): void {
    console.log('apply action');
  }
}
