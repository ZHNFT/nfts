export declare type TGoodValueType = string;
export interface IArgumentsParserResult {
    getCommand(): string;
    setCommand(command: string): void;
    getSubCommands(): string[];
    addSubCommand(subCommand: string): void;
    getValueByParamName(paramName: string): TGoodValueType;
    setValueByParamName(paramName: string, value: TGoodValueType): void;
}
export declare class ArgumentsParserResult implements IArgumentsParserResult {
    private _command;
    private readonly _subCommands;
    private readonly _errors;
    /**
     * 解析出来的参数对象；一旦解析完成，参数对象将被冻结，无法通过setParamValueByName更新；
     */
    private readonly _params;
    constructor();
    get command(): string;
    set command(_: unknown);
    hasParam(paramName: string): boolean;
    setCommand(commandName: string): void;
    getCommand: () => string;
    addSubCommand(subCommand: string): void;
    getSubCommands: () => string[];
    setValueByParamName: (paramName: string, value: TGoodValueType) => Map<string, string>;
    getValueByParamName: (paramName: string) => TGoodValueType;
}
