export interface ConfigInitOptions {
    cwd: string;
    configFile: string;
}
export declare class ConfigBase<T extends unknown> {
    #private;
    config: T;
    constructor({ cwd, configFile }: ConfigInitOptions);
    /**
     * @description 查看配置，并记录
     */
    lookup(): T;
    /**
     * @public
     * @description 获取配置所处的目录路径
     *
     */
    get cwd(): string;
    /**
     * @public
     * @description 获取配置所处的文件路径
     *
     */
    get configPath(): string;
}
