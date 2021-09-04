"use strict";
/**
 * @class ActionBase
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionBase = void 0;
const tapable_1 = require("tapable");
class ActionBase {
    constructor(options) {
        this.options = options;
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
    initializeHook() {
        if (this.hook) {
            return this.hook;
        }
        else {
            this.hook = new tapable_1.SyncHook();
        }
        return this.hook;
    }
    /**
     * @example
     *
     * // 使用 action.name 来访问名称
     */
    get name() {
        return this.actionName;
    }
}
exports.ActionBase = ActionBase;
