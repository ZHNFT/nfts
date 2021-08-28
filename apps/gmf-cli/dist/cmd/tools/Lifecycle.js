"use strict";
// 工具内部生命周期
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lifecycle = void 0;
const tapable_1 = require("tapable");
class Lifecycle {
    constructor() {
        this.start = new tapable_1.SyncHook();
    }
}
exports.Lifecycle = Lifecycle;
