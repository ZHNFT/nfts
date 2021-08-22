"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmfLifecycle = void 0;
/**
 *
 */
const tapable_1 = require("tapable");
class GmfLifecycle {
    constructor() {
        this.start = new tapable_1.AsyncParallelHook();
    }
}
exports.GmfLifecycle = GmfLifecycle;
