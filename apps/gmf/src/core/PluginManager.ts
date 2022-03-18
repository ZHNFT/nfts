import { Hook } from '@ntfs/hook';
import { BuildPhases, PreviewPhases, PublishPhases, TestPhases } from '../lifecycle';
import { PluginFuncArg } from './CommandTool';

export interface PluginContext {
  hook: {
    build: Hook<BuildPhases, PluginFuncArg>;
    preview: Hook<PreviewPhases, PluginFuncArg>;
    publish: Hook<PublishPhases, PluginFuncArg>;
    test: Hook<TestPhases, PluginFuncArg>;
  };
}

export default class PluginManager<T> {
  private readonly _pluginContext: T;
  private readonly _plugins: Plugin<T>[];

  constructor(ctx: T) {
    this._pluginContext = ctx;
    this._plugins = [];
  }

  public initPlugins(): Promise<any> {
    const tasks: ((args: T) => void | Promise<void>)[] = this._plugins.map(
      _plugin => _plugin.apply
    );

    return Hook.parallelCall(tasks, task => {
      return task(this._pluginContext);
    });
  }

  addPlugin(plugin: Plugin<T>): void {
    this._plugins.push(plugin);
  }
}

export abstract class Plugin<T> {
  abstract name: string;
  abstract summary: string;
  abstract apply: (ctx: T) => void | Promise<void>;
}
