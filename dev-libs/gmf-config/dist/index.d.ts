export interface ConfigInitOptions {
    cwd: string;
    configFile: string;
}
export declare class ConfigBase {
    #private;
    config: unknown;
    constructor({ cwd, configFile }: ConfigInitOptions);
    /**
     * @description 查看配置，并记录
     */
    lookup<T>(): T;
}
