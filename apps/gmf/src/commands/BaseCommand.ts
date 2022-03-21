import { SubParser, IParserOptionDefinition } from '@ntfs/argparser';
import { Hook } from '@ntfs/hook';
import { Plugin, loadModule, PluginContext } from '../core/Plugin';
import Config from '../core/Config';

export interface CommandInitOptions {
  name: string;
  usage: string;
  config: Config;
}

export default abstract class BaseCommand {
  public readonly parser: SubParser;
  private readonly _plugins: Plugin[];
  private readonly _config: Config;

  protected constructor({ name, usage, config }: CommandInitOptions) {
    this._config = config;
    this.parser = new SubParser({
      name: name,
      description: usage
    });
  }

  get name(): string {
    return this.parser.name;
  }

  public addOption(option: IParserOptionDefinition): void {
    this.parser.addOption(option);
  }

  public addPlugin = (plugin: Plugin) => this._plugins.push(plugin);

  public initPlugins = (ctx: PluginContext) => {
    const tasks: ((args: PluginContext) => void | Promise<void>)[] = this._plugins.map(
      _plugin => _plugin.apply
    );

    return Hook.parallelCall(tasks, task => {
      return task(ctx);
    });
  };

  /**
   * 加载文件
   * */
  public loadPlugins(): void | Promise<void> {
    const config = this._config.lookup();
    const { plugins } = config;

    if (!Array.isArray(plugins)) {
      throw new Error(`<plugins> field is not an array`);
    }

    for (const plugin of plugins) {
      const { name, action } = plugin;
      if (action === this.name) {
        this.addPlugin(loadModule(name) as Plugin);
      }
    }
  }
}
