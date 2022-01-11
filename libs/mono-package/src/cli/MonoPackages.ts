import { BaseSubCommand, CommandLineToolDefinition } from '@ntfs/command-line';
import { MonoPackagesConfig } from '../base/MonoPackagesConfig';
import { InstallSubCommand } from '../sub-commands/InstallSubCommand';
import { LinkSubCommand } from '../sub-commands/LinkSubCommand';
import { PnpmPackagesManager } from '../manager/pnpm';
import { BasePackagesManager } from '../base/BasePackagesManager';

export interface IInitialContext {
  readonly manager: BasePackagesManager;
}

export class MonoPackages extends CommandLineToolDefinition {
  private _config: MonoPackagesConfig;

  public constructor() {
    super({
      toolName: 'mono-package',
      toolDescription: 'this is a mono-package description'
    });

    this._config = new MonoPackagesConfig();

    const SubCommandContext = {
      parser: this._parser,
      config: this._config,
      manager: new PnpmPackagesManager({ config: this._config })
    };

    const installCommand = new InstallSubCommand(SubCommandContext);
    const linkCommand = new LinkSubCommand(SubCommandContext);

    this.defineSubCommand(installCommand);
    this.defineSubCommand(linkCommand);

    this._parser.exec(process.argv.slice(1).join(' '));
  }

  public prepare(): MonoPackages {
    this._readConfigFromCommandLine();
    return this;
  }

  public exec(): Promise<void> {
    if (!this._parser.result.getCommand()) {
      throw Error('需要一个命令');
    }

    const subCommands = this._subCommandsByName.values();
    let _targetSubCommand: BaseSubCommand;

    for (const subCommand of subCommands) {
      if (this._parser.result.getSubCommands().includes(subCommand.subCommandName)) {
        _targetSubCommand = subCommand;
      }
    }

    if (!_targetSubCommand) {
      throw Error('没有匹配到任何子命令');
    }

    return _targetSubCommand.apply();
  }

  private _readConfigFromCommandLine(): void {
    const _configPath = this._parser.result.getValueByParamName('--config');
    if (_configPath) {
      // @todo 这里需要使用JsonSchema来验证指定的配置的文件格式是否正确
      this._config = new MonoPackagesConfig(_configPath);
    }
  }
}
