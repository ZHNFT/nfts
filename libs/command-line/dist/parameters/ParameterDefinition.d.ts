export declare enum ParameterKinds {
    'STRING' = "STRING",
    'BOOLEAN' = "BOOLEAN",
    'ARRAY' = "ARRAY",
    'INTEGER' = "INTEGER"
}
export declare type TParameterKinds = keyof typeof ParameterKinds;
export interface IParamDefinition {
    /**
     *
     */
    paramName: string;
    paramShortName?: string;
    paramDescription: string;
    /**
     * @desc 参数是否必须
     */
    require: boolean;
    /**
     * @desc 参数类型
     */
    kind: TParameterKinds;
    /**
     * @desc 参数对应的操作方法；
     *       参数的具体逻辑由action执行；
     */
    paramAction: string;
}
export declare abstract class ParameterDefinitionBase implements IParamDefinition {
    private _value;
    paramName: string;
    paramShortName?: string;
    paramDescription: string;
    required: boolean;
    kind: TParameterKinds;
    get value(): unknown;
    set value(_: unknown);
    constructor(opts: IParamDefinition);
    require: boolean;
    paramAction: string;
    setValue(value: string): void;
}
