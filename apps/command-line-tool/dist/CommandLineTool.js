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
var _CommandLineTool__name, _CommandLineTool__description;
Object.defineProperty(exports, "__esModule", { value: true });
class CommandLineTool {
    constructor({ name, description }) {
        _CommandLineTool__name.set(this, void 0);
        _CommandLineTool__description.set(this, void 0);
        __classPrivateFieldSet(this, _CommandLineTool__name, name, "f");
        __classPrivateFieldSet(this, _CommandLineTool__description, description, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _CommandLineTool__name, "f");
    }
    get description() {
        return __classPrivateFieldGet(this, _CommandLineTool__description, "f");
    }
}
exports.default = CommandLineTool;
_CommandLineTool__name = new WeakMap(), _CommandLineTool__description = new WeakMap();
