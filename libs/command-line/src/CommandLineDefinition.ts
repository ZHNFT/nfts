import { BaseCommand } from './base/BaseCommand';

export class CommandLineToolDefinition extends BaseCommand {
	constructor({ toolName, toolDescription }: { toolName: string; toolDescription: string }) {
		super({
			commandName: toolName,
			commandDescription: toolDescription
		});
	}
}
