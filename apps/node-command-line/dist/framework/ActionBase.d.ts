/**
 * @class ActionBase
 */
import { SyncHook } from 'tapable';
export interface ActionBaseConfig {
    name: string;
    options: unknown;
}
export interface ActionBaseInitOption {
    actionName: string;
}
export declare class ActionBase {
    #private;
    options: ActionBaseInitOption;
    /**
     * 用来表示action的名称，作为action的标识存在。
     * 一个命令行周期中，不可以出现重复的action操作
     */
    private readonly actionName;
    constructor(options: ActionBaseInitOption);
    /**
     * 初始化hook属性。初始化之后，提供给插件，作为参数的一部分使用
     *
     * @example
     *
     * const ctx = {
     *   hooks: {
     *     [actionName]: xxAction.initializeHook()
     *   }
     * }
     *
     * function plug_in(ctx) {
     *   ctx.hooks[actionName].tap()
     * }
     *
     */
    initializeHook(): SyncHook<any>;
    /**
     * @example
     *
     * // 使用 action.name 来访问名称
     */
    get name(): string;
    get hook(): SyncHook<any>;
}
