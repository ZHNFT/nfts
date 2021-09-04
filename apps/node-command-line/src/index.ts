import { ActionBase } from './framework/ActionBase';
import { NodeCommandLineParser } from './framework/NodeCommandLineParser';

export class CommandLineTool extends NodeCommandLineParser {
  toolName: string;
  toolDescription: string;

  actions: ActionBase[];
  actionByName: Map<string, ActionBase> = new Map();

  constructor({ toolName, toolDescription }) {
    super();
    this.toolName = toolName;
    this.toolDescription = toolDescription;
  }

  /**
   *
   * @param actionName
   * @param action
   *
   * @example
   *
   * // 注册action
   * const buildAction = new ActionBase({ actionName: "build" })
   * CLT.addAction('action', )
   *
   */
  addAction(action: ActionBase) {
    this.actionByName.set(action.name, action);
    this.actions.push(action);
  }

  /**
   * @description 获取到action，通过actionName
   * @param actionName
   */
  getAction(actionName: string): ActionBase | undefined {
    return this.actionByName.get(actionName);
  }
}

export * from './framework/ActionBase';
export * from './framework/EventBase';
export * from './framework/NodeCommandLineParser';
