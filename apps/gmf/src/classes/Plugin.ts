import { Debug, Command } from '@nfts/noddy';
import { IStageHooks } from '../stages';
import { Configuration } from './Configuration';

export interface PluginContext {
  command: Command;
  hooks: IStageHooks;
  configuration: Configuration;
  getScopedLogger: (scopeName: string) => Debug;
}

export abstract class Plugin<PluginOptions = unknown> {
  abstract readonly name: string;
  abstract readonly summary: string;
  abstract apply(ctx: PluginContext, options: PluginOptions): void;
}
