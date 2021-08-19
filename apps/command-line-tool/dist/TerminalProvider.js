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
var _TerminalProvider__rl, _TerminalProvider__debug;
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const util_1 = require("util");
class TerminalProvider {
    constructor({ name }) {
        _TerminalProvider__rl.set(this, void 0);
        _TerminalProvider__debug.set(this, void 0);
        __classPrivateFieldSet(this, _TerminalProvider__debug, util_1.debuglog(name), "f");
        __classPrivateFieldSet(this, _TerminalProvider__rl, readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true
        }), "f");
    }
    /**
     *
     * @param msg {string | object}
     * @public
     */
    log(msg) {
        __classPrivateFieldGet(this, _TerminalProvider__debug, "f").call(this, msg);
    }
    /**
     *
     * @param msg {string | object}
     * @public
     */
    write(msg) {
        __classPrivateFieldGet(this, _TerminalProvider__rl, "f").write(msg);
    }
}
exports.default = TerminalProvider;
_TerminalProvider__rl = new WeakMap(), _TerminalProvider__debug = new WeakMap();
