import { IArgumentParamDefinition } from '@ntfs/node-arg-parser';
export declare type TFunction = () => void;
export interface IBaseParameterInitOptions extends IArgumentParamDefinition {
    /**
     * 参数对应的执行方法
     */
    callback: TFunction;
}
export declare class BaseParameter implements IArgumentParamDefinition {
    longName: string;
    summary: string;
    callback: TFunction;
    shortName?: string;
    required?: boolean;
    constructor(opts: IBaseParameterInitOptions);
}
