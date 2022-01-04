import { BaseSubCommand } from '@ntfs/command-line';
import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { MonoPackagesConfig } from '../base/MonoPackagesConfig';
import * as console from 'console';
import { BasePackagesManager } from '../base/BasePackagesManager';

export class InstallSubCommand extends BaseSubCommand {
	config: MonoPackagesConfig;
	manager: BasePackagesManager;

	constructor({ parser, config }: { parser: ArgumentsParser; config: MonoPackagesConfig }) {
		super({
			subCommandName: 'install',
			subCommandDescription: 'install dependencies for all packages',
			parser: parser
		});

		this.config = config;

		parser.defineParam({
			longName: '--adj',
			summary: '子命令参数设置'
		});
	}

	initialize<IInitialContext>(opts): BaseSubCommand {
		const { pnpm } = opts;
		this.manager = pnpm;
		return this;
	}

	apply(): Promise<void> {
		console.log('install command');
		const json = this.config.readFile();
		console.log(json);
		this.manager.install();

		return Promise.resolve(undefined);
	}
}
