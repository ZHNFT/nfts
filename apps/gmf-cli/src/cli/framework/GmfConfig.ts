import { ConfigBase, ConfigInitOptions } from '@gmf/gmf-config';
import { ActionBaseConfig } from '@gmf/node-command-line';
import { PluginConfig } from './PluginManager';

export interface GmfConfigSchema {
  /**
   * 名字
   */
  name: string;

  /**
   * 构建路径
   */
  buildPath: string;

  /**
   * 插件配置
   */
  plugins: PluginConfig[];

  /**
   * 自定义事件
   */
  customEvents: string[];

  /**
   * 自定义的操作，通过配置决定能执行的操作。
   */
  customActions: ActionBaseConfig[];
}

export class GmfConfig extends ConfigBase {
  constructor(options: ConfigInitOptions) {
    super(options);
  }
}
