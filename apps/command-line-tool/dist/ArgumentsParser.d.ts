interface ArgumentsOption {
    name: string;
    shortName?: string;
    default?: string | boolean;
    description?: string;
    validator?: (value: string) => boolean;
}
export declare type Spread<T> = {
    [P in keyof T]: T[P];
};
export declare type ParsedCommandLineOptions<T> = {
    _: string[];
} & Spread<T>;
export default class ArgumentsParser {
    readonly name: string;
    constructor({ name }: {
        name: string;
    });
    /**
     * @public
     * @param options
     */
    addOptions(options: ArgumentsOption[]): void;
    static parser: <T extends Record<string, string | boolean | string[]>>(args: string[]) => ParsedCommandLineOptions<T>;
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
export declare function argumentsParser<T>(args: string[]): ParsedCommandLineOptions<T>;
export {};
