import { Parser } from '@ntfs/argparser';
import { BuildCommand, TestCommand, PublishCommand, PreviewCommand } from '../commands';
import { PluginContext } from './Plugin';
import { BuildCycle, PreviewCycle, PublishCycle, TestCycle } from '../lifecycle';
import BaseCommand from '../commands/BaseCommand';
import Config from './Config';

export interface ICommandToolInitOptions {
  toolName: string;
  toolDescription: string;
}

export default class CommandTool extends Parser {
  private readonly _config: Config;
  private readonly _commands: BaseCommand[];

  private readonly _lifecycle: {
    build: BuildCycle;
    preview: PreviewCycle;
    publish: PublishCycle;
    test: TestCycle;
  };

  private readonly ctx: PluginContext;

  constructor({ toolName, toolDescription }: ICommandToolInitOptions) {
    super({
      name: toolName,
      description: toolDescription
    });

    this._config = new Config();

    this._lifecycle = {
      build: new BuildCycle(),
      preview: new PreviewCycle(),
      publish: new PublishCycle(),
      test: new TestCycle()
    };

    this.ctx = {
      config: this._config,
      hook: {
        test: this._lifecycle.test,
        build: this._lifecycle.build,
        preview: this._lifecycle.preview,
        publish: this._lifecycle.publish
      }
    };

    const buildCommand = new BuildCommand({ config: this._config });
    const previewCommand = new PreviewCommand({ config: this._config });
    const publishCommand = new PublishCommand({ config: this._config });
    const testCommand = new TestCommand({ config: this._config });

    this._addCommand(buildCommand);
    this._addCommand(previewCommand);
    this._addCommand(publishCommand);
    this._addCommand(testCommand);

    this.parse();
    this._loadConfigFrmCliOptions();
  }

  /**
   * @remark
   *  从命令行中获取参数，完善配置
   */
  private _loadConfigFrmCliOptions() {
    const options = this.options<{ clean: boolean }>();
  }

  private _addCommand(command: BaseCommand) {
    this.addParser(command.parser);
    this._commands.push(command);
  }

  private _findCommand(name: string): BaseCommand {
    return this._commands.find(_command => _command.name === name);
  }

  public async exec(): Promise<void> {
    const { _: actionName } = this.options<{ _: string }>();

    if (actionName) {
      const _command = this._findCommand(actionName);
      const _lifecycle = this._lifecycle[actionName];
      if (_command) {
        await _command.loadPlugins();
      }
      await _command.initPlugins(this.ctx);
      if (_lifecycle) {
        await _lifecycle.emitHook('before', { mock: 'mock' });
      }
    }
  }
}
