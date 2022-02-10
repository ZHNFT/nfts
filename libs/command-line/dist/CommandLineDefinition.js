import { Parser } from '@ntfs/node-arg-parser';
import { ScopedError } from '@ntfs/node-utils-library';
import { BaseCommand } from './base/BaseCommand';
export class CommandLineToolDefinition extends BaseCommand {
    constructor({ toolName, toolDescription }) {
        super({
            commandName: toolName,
            commandDescription: toolDescription
        });
        this._parser = Parser.getParser();
    }
    set parser(value) {
        throw CommandLineToolDefinition.error.fatal("Can't set parser directly");
    }
    defineParameters(paramDefinitions) {
        this._parser.defineParam(paramDefinitions.map(define => {
            return {
                flagName: define.shortName,
                required: define.required,
                desc: define.summary
            };
        }));
    }
}
CommandLineToolDefinition.error = new ScopedError('CommandLineToolDefinition');
