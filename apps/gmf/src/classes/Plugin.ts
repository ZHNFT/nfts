/*
 *  插件实例化需要的参数
 * */
import { THooks } from '../hook';
import { Configuration } from './Configuration';

export interface PluginContext {
  hook: THooks;
  config: Configuration;
}

export abstract class Plugin {
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
  abstract apply(ctx: PluginContext): void | Promise<void>;
}
