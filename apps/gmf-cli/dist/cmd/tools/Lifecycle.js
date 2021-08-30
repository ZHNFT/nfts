"use strict";
// 工具内部生命周期
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lifecycle = exports.InternalPluginContext = void 0;
const tapable_1 = require("tapable");
class InternalPluginContext {
}
exports.InternalPluginContext = InternalPluginContext;
class Lifecycle {
    constructor() {
        this.start = new tapable_1.SyncHook();
    }
}
exports.Lifecycle = Lifecycle;
