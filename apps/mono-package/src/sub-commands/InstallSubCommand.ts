import { BaseSubCommand } from '@ntfs/command-line';
import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { MonoPackagesConfig } from '../config/MonoPackagesConfig';
import { PackagesManager } from '../manager/PackagesManager';

export class InstallSubCommand extends BaseSubCommand {
  private _config: MonoPackagesConfig;
  private _manager: PackagesManager;

  constructor({
    parser,
    config,
    manager
  }: {
    parser: ArgumentsParser;
    config: MonoPackagesConfig;
    manager: PackagesManager;
  }) {
    super({
      subCommandName: 'install',
      subCommandDescription: 'install dependencies for all packages',
      parser: parser
    });

    this._config = config;
    this._manager = manager;
  }

  onParametersDefine(): void {
    this.parser.defineParam({
      longName: '--config',
      shortName: '-C',
      summary: '这个配置会在终端打印出一串文字'
    });
  }

  apply(): Promise<void> {
    console.log('install command');
    return this._manager.installPackages();
  }
}
