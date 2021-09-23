"use strict";
/**
 * @class PluginManager 管理所有注册到GCL中的插件
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginManager = void 0;
const path = require("path");
class PluginManager {
    constructor(ctx, config, logger) {
        this.ctx = ctx;
        this.config = config;
        this.logger = logger;
        this._pluginConfigByName = new Map();
        this._ctx = ctx;
        this._config = config;
        this._logger = logger;
        const gmfConfig = this._config.lookup();
        const { name, plugins = [] } = gmfConfig;
        this.logger.log(`解析 ${name}
----------------------------
`);
        for (let i = 0; i < plugins.length; i++) {
            const plugin = plugins[i];
            this.logger.log(`读取插件配置： ${plugin.name}`);
            this._pluginConfigByName.set(plugin.name, plugin);
        }
    }
    /**
     * 从配置中读取并执行plugin方法
     */
    invokePlugins() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const pluginNames = this._pluginConfigByName.keys();
            try {
                for (var pluginNames_1 = __asyncValues(pluginNames), pluginNames_1_1; pluginNames_1_1 = yield pluginNames_1.next(), !pluginNames_1_1.done;) {
                    const name = pluginNames_1_1.value;
                    const { options } = this._pluginConfigByName.get(name);
                    this.logger.log(`执行插件方法： ${name}`);
                    const p = yield this._resolvePlugin(name);
                    p.call(null, this._ctx, options);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (pluginNames_1_1 && !pluginNames_1_1.done && (_a = pluginNames_1.return)) yield _a.call(pluginNames_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.logger.log(`>>>> 执行插件方法结束 <<<<`);
        });
    }
    _resolvePlugin(pluginModulePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = {};
            try {
                plugin = yield Promise.resolve().then(() => require(pluginModulePath));
            }
            catch (e) {
                plugin.default = yield this._resolvePluginLocal(pluginModulePath);
            }
            return plugin.default;
        });
    }
    _resolvePluginLocal(pluginModulePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin;
            // todo: dist需要被配置替换
            // eslint-disable-next-line prefer-const
            plugin = yield Promise.resolve().then(() => require(path.resolve(this._config.cwd, 'dist', pluginModulePath)));
            return plugin.default;
        });
    }
}
exports.PluginManager = PluginManager;
