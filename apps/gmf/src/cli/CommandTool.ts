import { CommandLine } from '@nfts/noddy';
import { PluginManager } from '../classes/PluginManager';
import { Configuration } from '../classes/Configuration';
import { BuildCommand } from './commands/BuildCommand';
import { BuildStage, BuildStageHooks } from '../stages/BuildStage';

export interface IStages {
  build: BuildStage;
}

export interface IStageHooks {
  build: BuildStageHooks;
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

    const stages: IStages = {
      build: buildStage
    };

    const stageHooks = {
      build: stages.build.hooks
    };

    // 实例化命令
    const build = new BuildCommand({ stage: buildStage });

    // 加载插件
    this._pluginManager = new PluginManager(this._config, stageHooks, build);

    // 添加指令
    this.addCommand(build);
  }

  public async exec(): Promise<void> {
    await this._pluginManager.initAsync();
    return super.execute();
  }
}
