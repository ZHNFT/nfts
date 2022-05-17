import { existsSync } from "fs";
import { Fs } from "@nfts/node-utils-library";
import Constants from "../Constants";

export interface IGmfConfig {
  entryFile: string;
  buildPath?: string;
  plugins?: {
    pluginName: string;
    options?: Record<string, unknown>;
  }[];
}

export class Configuration {
  config!: IGmfConfig;

  public loadConfig(): IGmfConfig | undefined {
    if (this.config) return this.config;

    if (!existsSync(Constants.GMF_CONFIG_PATH)) {
      return undefined;
    }

    return (this.config = Fs.readJsonSync(Constants.GMF_CONFIG_PATH));
  }

  public loadConfigFromFile(filePath: string): IGmfConfig | undefined {
    if (this.config) return this.config;

    if (!existsSync(filePath)) {
      return undefined;
    }

    return (this.config = Fs.readJsonSync(filePath));
  }
}
