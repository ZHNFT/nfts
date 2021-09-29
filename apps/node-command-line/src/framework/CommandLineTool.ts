import { NodeCommandLineParser } from './NodeCommandLineParser';
import { ActionBase } from './ActionBase';
import * as process from 'process';

type CommandLineToolInitOptions = {
  toolName: string;
  toolDescription: string;
};

/**
 * @class CommandLineTool
 */
export class CommandLineTool extends NodeCommandLineParser {
  toolName: string;
  toolDescription: string;

  actions: ActionBase[] = [];
  actionByName: Map<string, ActionBase> = new Map();

  constructor({ toolName, toolDescription }: CommandLineToolInitOptions) {
    super(process.argv.slice(2));
    this.toolName = toolName;
    this.toolDescription = toolDescription;
  }

  /**
   *
   * @param action
   *
   * @example
   *
   * // 注册action
   * const buildAction = new ActionBase({ actionName: "build" })
   * CLT.addAction('action', )
   *
   */
  addAction(action: ActionBase): void {
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
