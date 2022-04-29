import { CommandLine } from '@nfts/noddy';
import { PluginManager } from '../classes/PluginManager';
import { Configuration } from '../classes/Configuration';
import { BuildCommand } from './commands/BuildCommand';
import { BuildStage, BuildStageHooks } from '../stages/BuildStage';
import { BundleStage, BundleStageHooks } from '../stages/BundleStage';
import { BundleCommand } from './commands/BundleCommand';

export interface IStages {
  build: BuildStage;
  bundle: BundleStage;
}

export interface IStageHooks {
  build: BuildStageHooks;
  bundle: BundleStageHooks;
}

export default class GmfTool extends CommandLine {
  private readonly _pluginManager: PluginManager;
  private readonly _config: Configuration;

  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: `Develop toolchain`
    });

    // 配置文件
    this._config = new Configuration();

    // 构建阶段
    const buildStage = new BuildStage(this._config);
    const bundleStage = new BundleStage(this._config);

    const stages: IStages = {
      build: buildStage,
      bundle: bundleStage
    };

    const stageHooks = {
      build: stages.build.hooks,
      bundle: stages.bundle.hooks
    };

    // 实例化命令
    const build = new BuildCommand({ stage: buildStage });
    const bundle = new BundleCommand({ stage: bundleStage });

    // 加载插件
    this._pluginManager = new PluginManager(this._config, stageHooks, build);

    // 添加指令
    this.addCommand(build);
    this.addCommand(bundle);
  }

  public async exec(): Promise<void> {
    await this._pluginManager.initAsync();
    return super.execute();
  }
}
