/**
 * @class PluginManager 管理所有注册到GCL中的插件
 */
import { GmfConfig } from './GmfConfig';
import { Logger } from './Logger';
import { SyncHook } from 'tapable';
export interface PluginConfig {
    name: string;
    options: unknown;
}
export interface CustomActionConfig {
    name: string;
    apply: () => void;
}
/**
 * 插件函数的上下文对象
 */
export interface PluginContext {
    hooks: {
        build: SyncHook<any>;
    };
    config: GmfConfig;
    logger: Logger;
    addAction: (actionConfig: CustomActionConfig) => void;
}
export declare type PluginImpl<T = unknown> = (ctx: PluginContext, options: T) => void;
export declare class PluginManager {
    readonly ctx: PluginContext;
    readonly config: GmfConfig;
    readonly logger: Logger;
    readonly _ctx: PluginContext;
    readonly _config: GmfConfig;
    readonly _logger: Logger;
    _pluginConfigByName: Map<string, PluginConfig>;
    constructor(ctx: PluginContext, config: GmfConfig, logger: Logger);
    /**
     * 从配置中读取并执行plugin方法
     */
    invokePlugins(): Promise<void>;
    private _resolvePlugin;
    private _resolvePluginLocal;
}
