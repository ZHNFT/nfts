import { Command } from '@nfts/noddy';
import { req } from '@nfts/node-utils-library';

import jestPlugin from '../internal-plugins/jest/JestPlugin';
import typescriptPlugin from '../internal-plugins/typescript/TypescriptPlugin';
import cleanPlugin from '../internal-plugins/cleanup/CleanPlugin';

import { Configuration } from './Configuration';
import { Plugin } from './Plugin';
import type { IStageHooks, IStages } from '../stages';
import { getScopedLogger } from '../utils/getScopeLogger';
import { Stage } from './Stage';

export class PluginManager {
  private readonly _command: Command;
  private readonly _config: Configuration;
  private readonly _stages: IStages;

  constructor(config: Configuration, stages: IStages, command: Command) {
    this._config = config;
    this._stages = stages;
    this._command = command;

    this.applyPlugin(typescriptPlugin);
    this.applyPlugin(jestPlugin);
    this.applyPlugin(cleanPlugin);
  }

  public initPluginsFromConfiguration() {
    const config = this._config.loadConfig();

    if (config?.plugins && Array.isArray(config.plugins)) {
      config.plugins.forEach(plugin => {
        const { pluginName, options } = plugin;
        this.applyPlugin(req.sync(pluginName) as Plugin, options);
      });
    }
  }

  private _getStageHooks(): IStageHooks {
    const hooks = {} as IStageHooks;

    for (const stageName in this._stages) {
      if (Object.prototype.hasOwnProperty.call(this._stages, stageName)) {
        const stage = this._stages[stageName as keyof IStages];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        hooks[stageName as keyof IStageHooks] = stage.internalHook;
      }
    }

    return hooks;
  }

  public applyPlugin(plugin: Plugin, options?: unknown): void {
    plugin.apply(
      {
        hooks: this._getStageHooks(),
        configuration: this._config,
        command: this._command,
        getScopedLogger
      },
      options
    );
  }
}
