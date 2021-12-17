export type ActionFunc<T> = (args: T) => void;

export abstract class ICommandAction<T> {
  readonly actionName: string;
  readonly actionDescription: string;
  readonly actionApplyHook: string;
  readonly actionOptions?: unknown;
  // Action对应的方法逻辑；

  private readonly _apply!: Promise<ActionFunc<T>>;

  get apply() {
    return this._apply;
  }

  set apply(_: unknown) {
    throw Error(`Can't reset action: ${this.actionName}`);
  }

  constructor({
    actionName,
    actionDescription,
    actionApplyHook,
    actionOptions
  }: {
    actionName: string;
    actionDescription: string;
    actionApplyHook: string;
    actionOptions?: unknown;
  }) {
    this.actionName = actionName;
    this.actionDescription = actionDescription;
    this.actionApplyHook = actionApplyHook;
    this.actionOptions = actionOptions;

    this._apply = this._initAction();
  }

  /**
   * @description 通过 actionName 来引入action函数逻辑
   */
  private async _initAction() {
    const { actionName } = this;
    return await import(actionName);
  }
}

export class CommandAction<T> extends ICommandAction<T> {
  constructor({
    actionName,
    actionDescription,
    actionApplyHook,
    actionOptions
  }: {
    actionName: string;
    actionDescription: string;
    actionApplyHook: string;
    actionOptions?: unknown;
  }) {
    super({ actionName, actionDescription, actionApplyHook, actionOptions });
  }
}
