import { ArgumentsParser } from '../../../node-arg-parser/src';
import { BaseParameter, IBaseParameter, IBaseParameterInitOptions } from './BaseParameter';

export interface ISubCommandLineInitOption {
	/**
	 * 子命令名称；
	 * @type {string}
	 */
	subCommandName: string;
	/**
	 * 子命令描述；
	 * @type {string}
	 */
	subCommandDescription: string;
}

export interface IBaseSubCommand extends ISubCommandLineInitOption {}

export abstract class BaseSubCommand implements IBaseSubCommand {
	readonly subCommandName: string;
	readonly subCommandDescription: string;

	/**
	 * @desc CLI参数解析实例
	 * @type {ArgumentsParser}
	 */
	protected readonly _argparser: ArgumentsParser;

	public constructor(opts: ISubCommandLineInitOption) {
		this.subCommandName = opts.subCommandName;
		this.subCommandDescription = opts.subCommandDescription;
	}

	/**
	 * @desc 定义子命令的参数信息
	 */
	protected abstract defineParameter(): void;

	protected abstract onDefinedParameter(): void;
}
