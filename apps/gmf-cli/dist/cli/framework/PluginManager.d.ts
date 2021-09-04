/**
 * @class PluginManager 管理所有注册到GCL中的插件
 */
import { GmfConfig } from './GmfConfig';
import { Logger } from './Logger';
export interface PluginConfig {
    name: string;
    options: unknown;
}
export declare type PluginImpl = (ctx: any, options: any) => void;
export declare class PluginManager {
    _ctx: any;
    _config: GmfConfig;
    _logger: Logger;
    _plugins: PluginImpl[];
    constructor(ctx: any, config: GmfConfig, logger: Logger);
    /**
     * 从配置中读取并执行plugin方法
     */
    invokePlugins(): Promise<void>;
}
