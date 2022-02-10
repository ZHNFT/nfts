import { Parser } from '@ntfs/node-arg-parser';
import { ScopedError } from '@ntfs/node-utils-library';
import { BaseParameter, TParameterDefinition } from './base/BaseParameter';
import { BaseCommand } from './base/BaseCommand';
export declare class CommandLineToolDefinition extends BaseCommand {
    readonly _parser: Parser;
    readonly _parameterByName: Map<string, BaseParameter>;
    static error: ScopedError;
    constructor({ toolName, toolDescription }: {
        toolName: string;
        toolDescription: string;
    });
    set parser(value: unknown);
    defineParameters(paramDefinitions: TParameterDefinition[]): void;
}
