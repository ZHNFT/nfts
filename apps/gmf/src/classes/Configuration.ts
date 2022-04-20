import { existsSync } from 'fs';
import { FileSystem } from '@nfts/node-utils-library';

export interface IGmfConfig {
  buildPath: string;
  plugins: {
    pluginName: string;
    [index: string]: string;
  }[];
}

/**
 * gmf 需要的配置文件，
 */
export class Configuration {
  config: IGmfConfig;

  public loadConfig(configPath: string): IGmfConfig | undefined {
    if (this.config) return this.config;

    if (!existsSync(configPath)) {
      return undefined;
    }

    return (this.config = FileSystem.readJsonSync(configPath));
  }
}
