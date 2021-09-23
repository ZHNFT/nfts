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
var _ConfigBase__cwd, _ConfigBase__configFilePath;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigBase = void 0;
const node_utils_1 = require("@gmf/node-utils");
class ConfigBase {
    constructor({ cwd, configFile }) {
        _ConfigBase__cwd.set(this, void 0);
        _ConfigBase__configFilePath.set(this, void 0);
        __classPrivateFieldSet(this, _ConfigBase__cwd, cwd, "f");
        __classPrivateFieldSet(this, _ConfigBase__configFilePath, configFile, "f");
    }
    /**
     * @description 查看配置，并记录
     */
    lookup() {
        if (this.config) {
            return this.config;
        }
        try {
            this.config = (0, node_utils_1.loadJsonSync)(__classPrivateFieldGet(this, _ConfigBase__configFilePath, "f"));
            return this.config;
        }
        catch (e) {
            throw Error(`加载配置文件失败，配置文件路径${__classPrivateFieldGet(this, _ConfigBase__configFilePath, "f")}`);
        }
    }
    /**
     * @public
     * @description 获取配置所处的目录路径
     *
     */
    get cwd() {
        return __classPrivateFieldGet(this, _ConfigBase__cwd, "f");
    }
    /**
     * @public
     * @description 获取配置所处的文件路径
     *
     */
    get configPath() {
        return __classPrivateFieldGet(this, _ConfigBase__configFilePath, "f");
    }
}
exports.ConfigBase = ConfigBase;
_ConfigBase__cwd = new WeakMap(), _ConfigBase__configFilePath = new WeakMap();
