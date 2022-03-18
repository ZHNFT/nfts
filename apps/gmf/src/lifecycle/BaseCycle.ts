import { Hook } from '@ntfs/hook';
import PluginManager, { Plugin, PluginContext } from '../core/PluginManager';
import Config from '../core/Config';
import { createRequire } from 'module';
import { resolve } from 'path';

const loadModule = <T>(name: string): T => {
  const req = createRequire(resolve(process.cwd(), 'node_modules'));
  return req(name);
};

export interface CycleInitOption {
  config: Config;
}

export abstract class BaseCycle<T = string, A = unknown> {
  public readonly config: Config;
  public readonly hook: Hook<T, A>;

  protected constructor({ config }: CycleInitOption) {
    this.config = config;
    this.hook = new Hook();
  }

  public loadPlugins(
    executeAction: string,
    pluginManager: PluginManager<PluginContext>
  ): void | Promise<void> {
    const config = this.config.lookup();
    const { plugins } = config;

    if (!Array.isArray(plugins)) {
      throw new Error(`<plugins> field is not an array`);
    }

    for (const plugin of plugins) {
      const { name, action } = plugin;
      if (action === executeAction) {
        pluginManager.addPlugin(loadModule(name) as Plugin<PluginContext>);
      }
    }
  }
}
