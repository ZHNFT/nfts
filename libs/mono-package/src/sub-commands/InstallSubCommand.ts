import { BaseSubCommand } from '@ntfs/command-line';
import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { MonoPackagesConfig } from '../base/MonoPackagesConfig';
import { BasePackagesManager } from '../base/BasePackagesManager';

export class InstallSubCommand extends BaseSubCommand {
  private _config: MonoPackagesConfig;
  private _manager: BasePackagesManager;

  constructor({
    parser,
    config,
    manager
  }: {
    parser: ArgumentsParser;
    config: MonoPackagesConfig;
    manager: BasePackagesManager;
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

  initialize<T extends unknown>(args?: T): BaseSubCommand {
    return undefined;
  }
}
