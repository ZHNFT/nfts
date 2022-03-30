import { BuildCycle, PreviewCycle, TestCycle } from '../lifecycle';
import Config from './Config';

/*
 *  插件实例化需要的参数
 * */
export interface PluginContext {
  config: Config;
  hook: {
    build: BuildCycle;
    preview: PreviewCycle;
    test: TestCycle;
  };
}

export abstract class Plugin {
  /*
   * @remark
   *   插件名称
   * */
  abstract name: string;
  /*
   *  @remark
   *   插件说明
   * */
  abstract summary: string;
  /*
   * @remark
   *   插件实现逻辑
   * */
  abstract apply(ctx: PluginContext): void | Promise<void>;
}
