import { THooks } from '../hook';
import { Configuration } from './Configuration';
import { Logger } from './Logger';

export interface PluginContext {
  hook: THooks;
  config: Configuration;
  logger: Logger;
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