/**
 * @class NodeCommandLineParser
 *
 * 在这里基础类中，只有解析命令行参数的功能。
 */
declare type CommandArgs = {
    _: string[];
};
declare type ParsedOptionArgs = Record<string, string | boolean>;
export declare type ParsedArgs<T> = T & CommandArgs;
export declare const argumentsParser: <T>(args: string[]) => ParsedArgs<T>;
declare type CommandOption = {
    longName: string;
    shortName: string;
    description: string;
};
export declare class NodeCommandLineParser<T = ParsedOptionArgs> {
    #private;
    parser(rawArgs: string[]): ParsedArgs<T>;
    get raw(): string[];
    /**
     * @description 添加命令行参数，这里添加的使一些通用的命令行参数，所有的action都可以配置
     * @param optionName
     *
     * @example
     *
     * nclp.addCommandOption([
     *  {
     *    longName: "--clean",
     *    shortName: "-c",
     *    description: "xxxx"
     *  },
     *  {
     *    longName: "--verbose",
     *    shortName: "-v",
     *    description: "xxxx"
     *  },
     *  ......
     * ])
     *
     */
    addCommandOption(options: CommandOption[]): void;
}
export {};