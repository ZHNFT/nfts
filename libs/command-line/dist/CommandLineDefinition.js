import { BaseCommand } from './base/BaseCommand';
export class CommandLineToolDefinition extends BaseCommand {
    constructor({ toolName, toolDescription }) {
        super({
            commandName: toolName,
            commandDescription: toolDescription
        });
    }
}
