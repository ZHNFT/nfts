import { ArgumentsParserError } from './ArgumentsParserError';
export interface IArgumentsParserResult {
    command: string;
    subCommands: Set<string>;
    params: Record<string, string>;
}
export declare class ArgumentsParserResult implements IArgumentsParserResult {
    command: string;
    subCommands: Set<string>;
    errors: ArgumentsParserError[];
    /**
     * 解析出来的参数对象；一旦解析完成，参数对象将被冻结，无法通过setParamValueByName更新；
     * @type {}
     */
    params: Record<string, string>;
    /**
     * 设置param值；
     * @param paramName
     * @param value
     */
    setParamValueByName(paramName: string, value: string): void;
    /**
     * 获取param的值；
     * @param paramName
     */
    getParamValueByName(paramName: string): string;
    /**
     * paramName是否存在与解析好的参数表中；
     * @param paramName
     */
    hasParam(paramName: string): any;
    /**
     * 设置command名称
     * @param commandName
     */
    setCommand(commandName: string): void;
    addSubCommands(commandName: string): void;
    /**
     * 冻结params对象，使其无法再次被更新；
     */
    private _frozen;
}
