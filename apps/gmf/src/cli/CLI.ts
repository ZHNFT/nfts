import PluginManager from '../core/PluginManager';
import CommandTool from '../core/CommandTool';

export class CLI {
  private _pluginManager: PluginManager;
  private _argParser: CommandTool;

  constructor() {
    this._argParser = new CommandTool({
      toolName: 'gmf',
      toolDescription: 'Development toolchain'
    });

    this._pluginManager = new PluginManager();
  }

  run(): Promise<void> {
    return Promise.resolve();
  }
}
