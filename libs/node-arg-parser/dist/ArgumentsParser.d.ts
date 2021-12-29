import { ArgumentsParserResult } from './ArgumentsParserResult';
export declare type TGoodParameterValueTypes = string | string[] | boolean | number;
export declare enum ArgumentParamKind {
    String = "String",
    Bool = "Bool",
    Array = "Array",
    Number = "Number"
}
export declare type TArgumentParamKind = keyof typeof ArgumentParamKind;
export interface IArgumentParam {
    name: string;
    summary?: string;
    required?: boolean;
    kind?: TArgumentParamKind;
}
export declare enum StepType {
    BeforeExec = "BeforeExec",
    AfterExec = "AfterExec"
}
export declare class ArgumentsParser {
    /**
     * 长参数名校验正则
     * @type {RegExp}
     */
    static argLongNameRegex: RegExp;
    /**
     * 短参数名校验正则
     * @type {RegExp}
     */
    static argShortNameRegex: RegExp;
    /**
     * 缓存defineParam设置的参数配置；
     * @type {Map<string, IArgumentParam>}
     */
    private _definedParams;
    /**
     * 解析错误
     * @type {ArgumentsParserError[]}
     */
    /**
     * 解析结果
     * @type {ArgumentsParserResult}
     */
    _result: ArgumentsParserResult;
    private _executed;
    constructor();
    /**
     * 缓存定义的参数配置
     */
    defineParam(param: IArgumentParam): void;
    /**
     * 获取参数值
     * @param paramName
     */
    getParamValue(paramName: string): TGoodParameterValueTypes;
    /**
     * 获取command
     */
    getCommand(): string;
    /**
     * 获取子命令集合
     */
    getSubCommands(): string[];
    /**
     * 通过kind，将数据转换称需要的类型，默认是string
     * @param kind
     * @param str
     * @private
     */
    private static _transValueByKind;
    /**
     * 将参数解析成Token形式
     * @return {void}
     */
    exec(args: string): ArgumentsParserResult;
    private _getParamsFromTokens;
    private _tokenKind;
    private _processVerify;
}
