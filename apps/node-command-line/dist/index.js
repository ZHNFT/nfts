"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ActionBase__name, _ActionBase__plugins;
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsParser = exports.NodeCommandLine = exports.ActionBase = exports.PluginMgmt = exports.PluginContext = void 0;
class PluginContext {
}
exports.PluginContext = PluginContext;
class PluginMgmt {
    initializePlugins() {
        return this.hook;
    }
}
exports.PluginMgmt = PluginMgmt;
class ActionBase {
    constructor({ name }) {
        _ActionBase__name.set(this, void 0);
        _ActionBase__plugins.set(this, void 0);
        __classPrivateFieldSet(this, _ActionBase__name, name, "f");
        __classPrivateFieldSet(this, _ActionBase__plugins, new PluginMgmt(), "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _ActionBase__name, "f");
    }
    get plugins() {
        return __classPrivateFieldGet(this, _ActionBase__plugins, "f");
    }
}
exports.ActionBase = ActionBase;
_ActionBase__name = new WeakMap(), _ActionBase__plugins = new WeakMap();
class NodeCommandLine {
    constructor({ toolName, toolDescription }) {
        this.toolName = toolName;
        this.toolDescription = toolDescription;
    }
    getActionByName(actionName) {
        return this.actionsByName[actionName];
    }
}
exports.NodeCommandLine = NodeCommandLine;
const argsParser = (args) => {
    const obj = Object.create(null);
    let option;
    let prevFlagName;
    obj._ = [];
    while ((option = args.shift())) {
        if (/^[-]{1,2}\w/.test(option)) {
            if (prevFlagName) {
                obj[prevFlagName] = true;
            }
            prevFlagName = option.startsWith('--')
                ? option.replace('--', '')
                : option.replace('-', '');
        }
        else {
            if (prevFlagName) {
                obj[prevFlagName] = option;
            }
            else {
                obj._.push(option);
            }
            prevFlagName = '';
        }
    }
    return obj;
};
exports.argsParser = argsParser;
