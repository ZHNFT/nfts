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
        this._plugins = [];
        this._ctx = ctx;
        this._config = config;
        this._logger = logger;
    }
    /**
     * 从配置中读取并执行plugin方法
     */
    invokePlugins() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { plugins } = this._config.lookup();
            try {
                for (var plugins_1 = __asyncValues(plugins), plugins_1_1; plugins_1_1 = yield plugins_1.next(), !plugins_1_1.done;) {
                    const { name, options } = plugins_1_1.value;
                    const p = yield Promise.resolve().then(() => require(path.resolve(this._config.cwd, 'dist', name)));
                    p.default.call(null, this._ctx, options);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (plugins_1_1 && !plugins_1_1.done && (_a = plugins_1.return)) yield _a.call(plugins_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
}
exports.PluginManager = PluginManager;
