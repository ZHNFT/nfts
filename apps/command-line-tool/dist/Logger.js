"use strict";
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
var _Timer__ms, _Timer__interval, _Logger__timer, _Logger__options;
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = void 0;
class Timer {
    constructor() {
        _Timer__ms.set(this, void 0);
        _Timer__interval.set(this, void 0);
    }
    get interval() {
        return __classPrivateFieldGet(this, _Timer__interval, "f");
    }
    start() {
        __classPrivateFieldSet(this, _Timer__ms, new Date().getTime(), "f");
    }
    end() {
        __classPrivateFieldSet(this, _Timer__interval, new Date().getTime() - __classPrivateFieldGet(this, _Timer__ms, "f"), "f");
    }
}
_Timer__ms = new WeakMap(), _Timer__interval = new WeakMap();
exports.defaultOptions = {
    verbose: false,
    enableTimeSummary: true
};
class Logger {
    constructor(options) {
        _Logger__timer.set(this, void 0);
        _Logger__options.set(this, void 0);
        __classPrivateFieldSet(this, _Logger__options, options, "f");
        __classPrivateFieldSet(this, _Logger__timer, new Timer(), "f");
    }
    get options() {
        return __classPrivateFieldGet(this, _Logger__options, "f");
    }
    /**
     * @description 计算方法执行完成之后的时间
     * @param func
     *
     * @public
     */
    async logCallbackTime(callback) {
        __classPrivateFieldGet(this, _Logger__timer, "f").start();
        __classPrivateFieldGet(this, _Logger__timer, "f").end();
        console.log(__classPrivateFieldGet(this, _Logger__timer, "f").interval);
    }
}
exports.default = Logger;
_Logger__timer = new WeakMap(), _Logger__options = new WeakMap();
