import { Parser } from '@ntfs/argparser';
import { BuildCommand, TestCommand, PublishCommand, PreviewCommand } from '../commands';
import PluginManager, { PluginContext } from './PluginManager';
import { BuildCycle, PreviewCycle, PublishCycle, TestCycle } from '../lifecycle';
import BaseCommand from '../commands/BaseCommand';
import Config from './Config';
import { CycleInitOption } from '../lifecycle/BaseCycle';

export interface PluginFuncArg {
  mock: string;
}

export default class CommandTool {
  private readonly _config: Config;
  private readonly _parser: Parser;
  private readonly _commandByName: Map<string, BaseCommand>;
  private readonly _pluginManager: PluginManager<PluginContext>;

  private readonly _lifecycle: {
    build: BuildCycle<PluginFuncArg>;
    preview: PreviewCycle<PluginFuncArg>;
    publish: PublishCycle<PluginFuncArg>;
    test: TestCycle<PluginFuncArg>;
  };

  constructor({
    toolName,
    toolDescription
  }: {
    toolName: string;
    toolDescription: string;
  }) {
    this._parser = new Parser({
      name: toolName,
      description: toolDescription
    });
    this._config = new Config();
    this._commandByName = new Map<string, BaseCommand>();

    const cycleOptions: CycleInitOption = {
      config: this._config
    };

    this._lifecycle = {
      build: new BuildCycle<PluginFuncArg>(cycleOptions),
      preview: new PreviewCycle<PluginFuncArg>(cycleOptions),
      publish: new PublishCycle<PluginFuncArg>(cycleOptions),
      test: new TestCycle<PluginFuncArg>(cycleOptions)
    };

    /**
     * 提供插件使用的参数，主要数据：
     *  1. 能侵入构建流程的钩子函数。
     *  2. 配置文件实例，读取用户自定义信息。
     */
    const ctx: PluginContext = {
      hook: {
        test: this._lifecycle.test.hook,
        build: this._lifecycle.build.hook,
        preview: this._lifecycle.preview.hook,
        publish: this._lifecycle.publish.hook
      }
    };

    this._pluginManager = new PluginManager<PluginContext>(ctx);

    const buildCommand = new BuildCommand({
      pluginManager: this._pluginManager
    });
    const previewCommand = new PreviewCommand();
    const publishCommand = new PublishCommand();
    const testCommand = new TestCommand();

    this._addCommand(buildCommand);
    this._addCommand(previewCommand);
    this._addCommand(publishCommand);
    this._addCommand(testCommand);

    this._parser.parse();
    this._loadConfigFrmCliOptions();
  }

  /**
   * @remark
   *  从命令行中获取参数，完善文件
   */
  private _loadConfigFrmCliOptions() {
    const options = this._parser.options<{ clean: boolean }>();
  }

  private _addCommand(command: BaseCommand) {
    this._parser.addParser(command.parser);
    this._commandByName.set(command.parser.name, command);
  }

  public async exec(): Promise<void> {
    const _executedParser = this._parser.executedParser;

    if (_executedParser) {
      const { name } = _executedParser;
      const command = this._commandByName.get(name);
      const lifecycle = this._lifecycle[name];
      if (lifecycle) {
        await lifecycle.loadPlugins(name, this._pluginManager);
      }
      await this._pluginManager.initPlugins();
      await this._lifecycle.build.hook.emitHook('before', { mock: 'mock' });
    }
  }
}
