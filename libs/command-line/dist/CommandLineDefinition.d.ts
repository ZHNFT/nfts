import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { BaseParameter, IBaseParameterInitOptions } from './base/BaseParameter';
import { BaseCommand } from './base/BaseCommand';
export declare class CommandLineToolDefinition extends BaseCommand {
    private readonly _parser;
    readonly _parameterByName: Map<string, BaseParameter>;
    constructor({ toolName, toolDescription }: {
        toolName: string;
        toolDescription: string;
    });
    get parser(): ArgumentsParser;
    set parser(value: unknown);
    defineParameters(paramDefinitions: IBaseParameterInitOptions[]): void;
}
