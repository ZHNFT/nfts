import { BaseSubCommand } from '@ntfs/command-line';
import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { MonoPackageConfig } from '../base/MonoPackageConfig';

export class InstallSubCommand extends BaseSubCommand {
  config: MonoPackageConfig;

  constructor({
    parser,
    config
  }: {
    parser: ArgumentsParser;
    config: MonoPackageConfig;
  }) {
    super({
      subCommandName: 'install',
      subCommandDescription: '',
      parser: parser
    });

    this.config = config;

    parser.defineParam({
      longName: '--adj',
      summary: '子命令参数设置'
    });
  }

  initialize(): BaseSubCommand {
    console.log('Install SubCommand initialization');
    return this;
  }

  apply(): Promise<void> {
    console.log('ggg');
    return Promise.resolve(undefined);
  }
}
