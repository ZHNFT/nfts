import { DebugTool } from '@nfts/noddy';
import { THooks } from '../hook';
import { Configuration } from './Configuration';

export interface PluginContext {
  hook: THooks;
  config: Configuration;
  getLogger: (scopeName: string) => DebugTool.Debug;
}

export abstract class Plugin<PluginOptions = unknown> {
  /*
   * @remark
   *   插件名称
   * */
  abstract readonly name: string;
  /*
   *  @remark
   *   插件说明
   * */
  abstract readonly summary: string;
  /*
   * @remark
   *   插件实现逻辑
   * */
  abstract apply(ctx: PluginContext, options?: PluginOptions): void | Promise<void>;
}
