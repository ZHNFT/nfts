import { existsSync } from 'fs';
import { Json } from '@nfts/node-utils-library';
import Constants from '../Constants';

export enum TargetModuleKinds {
  'CommonJS',
  'AMD',
  'UMD',
  'ESNext',
  'System'
}

export interface IGmfConfig {
  output?: string;
  bundle?: {
    entry: string | string[];
    target?: TargetModuleKinds;
  };
  build?: {};
  plugins?: {
    pluginName: string;
    options?: Record<string, unknown>;
  }[];
}

/**
 * gmf 需要的配置文件，
 */
export class Configuration {
  config: IGmfConfig;

  public loadConfig(): IGmfConfig | undefined {
    if (this.config) return this.config;

    if (!existsSync(Constants.GMF_CONFIG_PATH)) {
      return undefined;
    }

    return (this.config = Json.readJsonSync(Constants.GMF_CONFIG_PATH));
  }

  public loadConfigFromFile(filePath: string): IGmfConfig | undefined {
    //
    if (this.config) return this.config;

    if (!existsSync(filePath)) {
      return undefined;
    }

    return (this.config = Json.readJsonSync(filePath));
  }
}
