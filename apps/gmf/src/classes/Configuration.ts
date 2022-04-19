import { existsSync } from 'fs';
import { FileSystem } from '@nfts/node-utils-library';

export interface IGmfConfig {
  plugins: {
    pluginName: string;
    [index: string]: string;
  }[];
}

/**
 * gmf 需要的配置文件，
 */
export class Configuration {
  public loadConfig(configPath: string): IGmfConfig | undefined {
    if (!existsSync(configPath)) {
      return undefined;
    }

    return FileSystem.readJsonSync(configPath);
  }
}
