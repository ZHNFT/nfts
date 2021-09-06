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
export interface PluginContext {
    hooks: {
        build: SyncHook<any>;
    };
    config: GmfConfig;
    logger: Logger;
}
export declare type PluginImpl = (ctx: PluginContext, options: any) => void;
export declare class PluginManager {
    _ctx: any;
    _config: GmfConfig;
    _logger: Logger;
    _plugins: PluginImpl[];
    constructor(ctx: PluginContext, config: GmfConfig, logger: Logger);
    /**
     * 从配置中读取并执行plugin方法
     */
    invokePlugins(): Promise<void>;
}
