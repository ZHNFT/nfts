import { ArgumentsParser } from '@ntfs/node-arg-parser';

export interface ISubCommandLineInitOption {
	/**
	 * 子命令名称；
	 */
	readonly subCommandName: string;
	/**
	 * 子命令描述；
	 */
	readonly subCommandDescription: string;
	readonly parser: ArgumentsParser;
}

export interface IBaseSubCommand {}

export abstract class BaseSubCommand implements IBaseSubCommand {
	readonly subCommandName: string;
	readonly subCommandDescription: string;

	private readonly parser: ArgumentsParser;

	protected constructor({
		subCommandName,
		subCommandDescription,
		parser
	}: ISubCommandLineInitOption) {
		this.subCommandName = subCommandName;
		this.subCommandDescription = subCommandDescription;
		this.parser = parser;
	}

	/**
	 * 主要的执行方法
	 * @method apply
	 * @return {Promise<void>} [description]
	 */
	public abstract apply(): Promise<void>;
	/**
	 * 初始化子命令
	 * @type {[type]}
	 */
	public abstract initialize<T>(args?: T): IBaseSubCommand;
	/**
	 * 在该方法中定义命令行参数
	 * @method onParametersDefine
	 */
	public abstract onParametersDefine(): void;
}
