"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginManager = void 0;
/**
 * 负责执行所有的plugin方法
 */
class PluginManager {
    constructor(hooks, lifecycle, config) {
        this.hooks = hooks;
        this.config = config;
        this.lifecycle = lifecycle;
    }
    invokeLifecycleStart(name) {
        this.config.lookup();
    }
}
exports.PluginManager = PluginManager;
