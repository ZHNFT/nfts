export declare class Config<T> {
    #private;
    constructor({ cwd, configFile }: {
        cwd: string;
        configFile: string;
    });
    lookup(): T;
}
