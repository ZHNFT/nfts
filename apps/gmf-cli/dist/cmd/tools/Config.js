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
var _Config__cwd, _Config__configFile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const path = require("path");
const fs = require("fs");
class Config {
    constructor({ cwd, configFile }) {
        _Config__cwd.set(this, void 0);
        _Config__configFile.set(this, void 0);
        __classPrivateFieldSet(this, _Config__cwd, cwd, "f");
        __classPrivateFieldSet(this, _Config__configFile, configFile, "f");
    }
    lookup() {
        const config = {};
        let configFilePath = __classPrivateFieldGet(this, _Config__configFile, "f");
        if (!path.isAbsolute(__classPrivateFieldGet(this, _Config__configFile, "f"))) {
            configFilePath = path.resolve(__classPrivateFieldGet(this, _Config__cwd, "f"), __classPrivateFieldGet(this, _Config__configFile, "f"));
        }
        const fsdata = fs.readFileSync(configFilePath, { encoding: 'utf-8' });
        /// todo: add log here
        return config;
    }
}
exports.Config = Config;
_Config__cwd = new WeakMap(), _Config__configFile = new WeakMap();
