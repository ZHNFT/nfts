interface CommandLineInfo {
    name: string;
    description: string;
}
export default class CommandLineTool {
    #private;
    constructor({ name, description }: CommandLineInfo);
    get commandLineOptions(): unknown;
    get name(): string;
    get description(): string;
    parser(argv?: string[]): this;
}
/**
 *
 * @param args
 *
 * @example
 *
 * const result = argumentsParser(['command', '--a', 'a', '-b', 'b', '--true', '--alsoTrue'])
 *
 * result // {
 *   _: ['command'],
 *   'a': 'a',
 *   'b': 'b',
 *   'true': true,
 *   'alsoTrue': true,
 *  }
 *
 */
export declare function argumentsParser(args: string[]): any;
export {};
