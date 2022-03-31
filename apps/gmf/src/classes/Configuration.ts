import { FileSystem } from '@nfts/node-utils-library';
import Constants from '../Constants';

export interface IConfig {
  'gmf-plugins': {
    pluginName: string;
  }[];
}

/**
 * gmf 需要的配置文件，
 */
export class Configuration {
  public loadConfig(): IConfig {
    return FileSystem.readJsonSync<IConfig>(Constants.ConfigFile);
  }
}
