import { ActionBase } from './framework/ActionBase';
import { NodeCommandLineParser } from './framework/NodeCommandLineParser';
export declare class CommandLineTool extends NodeCommandLineParser {
    toolName: string;
    toolDescription: string;
    actions: ActionBase[];
    actionByName: Map<string, ActionBase>;
    constructor({ toolName, toolDescription }: {
        toolName: any;
        toolDescription: any;
    });
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
    addAction(action: ActionBase): void;
    /**
     * @description 获取到action，通过actionName
     * @param actionName
     */
    getAction(actionName: string): ActionBase | undefined;
}
export * from './framework/ActionBase';
export * from './framework/EventBase';
export * from './framework/NodeCommandLineParser';
