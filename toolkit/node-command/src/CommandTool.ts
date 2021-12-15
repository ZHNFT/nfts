import cli_args, { ArgsResult as IArgsResult } from '@nfts/node-args';
import { ICommand } from './Command';

export abstract class ICommandTool {
	toolName: string;
	toolDescription: string;

	// 更新指令
	abstract addCommand(
		commandName: string,
		command: ICommand<unknown>
	): Map<string, ICommand<unknown>>;
	// 获取指令
	abstract getCommand(commandName: string): ICommand<unknown>;
	// 解析命令行参数
	commandLineArgumentsParser(): IArgsResult {
		return cli_args(process.argv.slice(2));
	}
}

export class CommandTool extends ICommandTool {
	toolName: string;
	toolDescription: string;

	commands: Map<string, ICommand<unknown>>;

	rawArgs: string[];
	argsParseResult: IArgsResult;

	constructor() {
		super();
		this.commands = new Map();
		this.rawArgs = process.argv.slice(2);
		this.argsParseResult = this.commandLineArgumentsParser();
	}

	addCommand = (
		commandName: string,
		command: ICommand<unknown>
	): Map<string, ICommand<unknown>> => this.commands.set(commandName, command);

	getCommand = (name: string): ICommand<unknown> => {
		return this.commands.get(name);
	};
}
