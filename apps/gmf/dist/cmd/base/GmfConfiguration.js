"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _GmfConfiguration_name, _GmfConfiguration_description;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmfConfiguration = void 0;
class GmfConfiguration {
    constructor({ name, description }) {
        _GmfConfiguration_name.set(this, void 0);
        _GmfConfiguration_description.set(this, void 0);
        __classPrivateFieldSet(this, _GmfConfiguration_name, name, "f");
        __classPrivateFieldSet(this, _GmfConfiguration_description, description, "f");
    }
    /**
     * @param cwd
     * @description 访问配置文件
     */
    lookup({ cwd, configPath }) {
        //
    }
}
exports.GmfConfiguration = GmfConfiguration;
_GmfConfiguration_name = new WeakMap(), _GmfConfiguration_description = new WeakMap();
