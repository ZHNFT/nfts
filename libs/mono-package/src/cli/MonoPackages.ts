import * as process from 'process';
import { CommandLineToolDefinition } from '@ntfs/command-line';
import { MonoPackageConfig } from '../base/MonoPackageConfig';

export class MonoPackages extends CommandLineToolDefinition {
  private _config: MonoPackageConfig;

  public constructor() {
    super({
      toolName: 'mono-package',
      toolDescription: 'this is a mono-package description'
    });

    this._parser.defineParam({
      longName: '--list',
      shortName: '-l',
      summary: '罗列所有被管理的包'
    });

    this._parser.defineParam({
      longName: '--config',
      summary: '指定配置文件位置'
    });

    this._parser.defineParam({
      longName: '--version',
      shortName: '-V',
      summary: '版本信息'
    });

    this._config = new MonoPackageConfig();
    this._parser.exec(process.argv.slice(1).join(' '));

    this.defineSubCommand({
      subCommandName: 'install',
      subCommandDescription: '安装包',
      parser: this._parser
    });
  }

  public prepare() {
    this._readConfigFromCommandLine();
    return this;
  }

  public exec(): Promise<void> {
    return Promise.resolve();
  }

  private _readConfigFromCommandLine() {
    const _configPath = this._parser.result.getValueByParamName('--config');
    if (_configPath) {
      // @todo 这里需要使用JsonSchema来验证指定的配置的文件格式是否正确
      this._config = new MonoPackageConfig(_configPath);
    }
  }
}
