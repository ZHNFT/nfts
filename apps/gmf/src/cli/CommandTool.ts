import { CommandLine } from '@nfts/noddy';
import { PluginManager } from '../classes/PluginManager';
import { Configuration } from '../classes/Configuration';
import { BuildCommand } from './commands/BuildCommand';
import { BuildStage, BundleStage } from '../stages';
import { BundleCommand } from './commands/BundleCommand';

export default class GmfTool extends CommandLine {
  private readonly _pluginManager: PluginManager;
  private readonly _config: Configuration;

  constructor() {
    super({ toolName: 'gmf', toolDescription: `Develop toolchain` });
    // 1. 读取配置文件
    this._config = new Configuration();
    // 构建阶段
    const buildStage = new BuildStage();
    const bundleStage = new BundleStage();

    // 2. 实例化命令
    const build = new BuildCommand({ stage: buildStage });
    const bundle = new BundleCommand({ stage: bundleStage });
    // 3. 加载插件
    this._pluginManager = new PluginManager(this._config, { build: buildStage, bundle: bundleStage }, build);
    // 4. 添加指令到 parser
    this.addCommand(build);
    this.addCommand(bundle);
  }

  private _loadConfigFromCommandLine() {
    const { _: commandName, ...params } = this.parseCommandLine();
  }

  public exec(): Promise<void> {
    this._loadConfigFromCommandLine();
    this._pluginManager.initPluginsFromConfiguration();
    return this.execute();
  }
}
