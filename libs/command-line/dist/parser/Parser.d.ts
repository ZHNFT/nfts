import { ParameterDefinitionBase } from '../parameters/index';
export interface ArgsResult {
    _: string;
    [key: string]: string;
}
export declare class Parser {
    private readonly _commandLineClassOptions;
    commandName: string;
    constructor();
    exec(commandLineOptions: string[]): void;
    private _matchParameterWithParsedResult;
    registerParameter(defineOpts: Omit<ParameterDefinitionBase, 'value' | '_value' | 'setValue'>): void;
    getParameters(): {};
}
