import { IArgumentParamDefinition } from '@ntfs/node-arg-parser';
export declare type AsyncFunction<T extends unknown> = () => Promise<T>;
export interface IBaseParameterInitOptions extends IArgumentParamDefinition {
    /**
     * 参数对应的执行方法
     */
    callback: AsyncFunction<unknown>;
}
export declare class BaseParameter implements IArgumentParamDefinition {
    longName: string;
    summary: string;
    callback?: AsyncFunction<unknown>;
    constructor(opts: IBaseParameterInitOptions);
}
