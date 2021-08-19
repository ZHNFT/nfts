"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapable_1 = require("tapable");
/**
 * @class Lifecycle
 */
class Lifecycle {
    constructor() {
        this.before = new tapable_1.SyncWaterfallHook(['before']);
        this.process = new tapable_1.SyncWaterfallHook(['process']);
        this.after = new tapable_1.SyncWaterfallHook(['after']);
    }
}
class PluginManager {
    constructor() {
        this.lifecycle = new Lifecycle();
    }
}
const aa = new PluginManager();
aa.lifecycle.before.tap('plugin-a', (args) => {
    console.log('plugin-a', args);
    return args + '1';
});
aa.lifecycle.before.tap('plugin-b', (args) => {
    console.log('plugin-b', args);
    return args + '2';
});
aa.lifecycle.before.tap('plugin-c', (args) => {
    console.log('plugin-c', args);
    return args + '3';
});
aa.lifecycle.before.promise('999').then((result) => {
    console.log('4', result);
});
