"use strict";
/**
 * @class ActionBase
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ActionBase__hook;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionBase = void 0;
const tapable_1 = require("tapable");
class ActionBase {
    constructor(options) {
        this.options = options;
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
        _ActionBase__hook.set(this, void 0);
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
        if (__classPrivateFieldGet(this, _ActionBase__hook, "f")) {
            return __classPrivateFieldGet(this, _ActionBase__hook, "f");
        }
        else {
            __classPrivateFieldSet(this, _ActionBase__hook, new tapable_1.SyncHook([this.actionName]), "f");
        }
        return __classPrivateFieldGet(this, _ActionBase__hook, "f");
    }
    /**
     * @example
     *
     * // 使用 action.name 来访问名称
     */
    get name() {
        return this.actionName;
    }
    get hook() {
        return __classPrivateFieldGet(this, _ActionBase__hook, "f");
    }
}
exports.ActionBase = ActionBase;
_ActionBase__hook = new WeakMap();
