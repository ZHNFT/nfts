export type TCommandLineInitOption = {
	version: string;
	commandName: string;
	commandDescription: string;
};

/**
 * @desc 使用BaseCommand来构建命令行工具；
 * 			 Command实现类需要具备一下几种必须属性
 * 			 - 1
 * 			 - 2
 *
 * @example
 *
 *
 */
export abstract class BaseCommand {
	readonly _version: string;
	readonly commandName: string;
	readonly commandDescription: string;

	protected constructor(opts: TCommandLineInitOption) {
		this.commandName = opts.commandName;
		this.commandDescription = opts.commandDescription;
	}

	public abstract defineSubCommand(): void;
}
