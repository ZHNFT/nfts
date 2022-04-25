import { SubParser } from '@nfts/argparser';
import { CommandLineParameterManager } from './CommandLineParameter';

export abstract class Command extends CommandLineParameterManager {
	public readonly subParser: SubParser;

	protected constructor({
		commandName,
		commandDescription
	}: {
		commandName: string;
		commandDescription: string;
	}) {
		const subParser = new SubParser(commandName, commandDescription);

		super({ parser: subParser });

		this.subParser = subParser;
		this.onDefineParameters();
	}

	get name(): string {
		return this.subParser.name;
	}

	/**
	 * 执行逻辑
	 */
	abstract onExecute(args?: unknown): Promise<void>;

	/**
	 * 命令行参数配置逻辑
	 * 子类型必须实现以完成命令行参数的配置
	 */
	abstract onDefineParameters(): void;
}
