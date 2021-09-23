"use strict";
/**
 * @class EventBase
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _EventBase__name;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBase = void 0;
class EventBase {
    constructor({ name }) {
        _EventBase__name.set(this, void 0);
        __classPrivateFieldSet(this, _EventBase__name, name, "f");
    }
    apply() {
        //
    }
}
exports.EventBase = EventBase;
_EventBase__name = new WeakMap();
