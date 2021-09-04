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

export class ActionBase {
  /**
   * 用来表示action的名称，作为action的标识存在。
   * 一个命令行周期中，不可以出现重复的action操作
   */
  private readonly actionName: string;
  /**
   * hook主要被用在plugin函数中，作为参数，
   * 在plugin函数中可以使用此hook绑定一些方法
   *
   * @example
   *
   * // 编写插件
   * function plugin_a(hooks, pluginOption) {
   *   hooks.build.tap('plugin_a', function(ctx){
   *      ...
   *   })
   * }
   *
   */
  #_hook: SyncHook<any>;

  constructor(public options: ActionBaseInitOption) {
    this.actionName = options.actionName;
  }

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
  initializeHook(): SyncHook<any> {
    if (this.#_hook) {
      return this.#_hook;
    } else {
      this.#_hook = new SyncHook<any>([this.actionName]);
    }

    return this.#_hook;
  }

  /**
   * @example
   *
   * // 使用 action.name 来访问名称
   */
  get name(): string {
    return this.actionName;
  }

  get hook(): SyncHook<any> {
    return this.#_hook;
  }
}
