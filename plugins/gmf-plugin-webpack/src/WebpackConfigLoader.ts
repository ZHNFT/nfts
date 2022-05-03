import * as fs from 'fs';
import { importSync } from '@nfts/node-utils-library';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export class WebpackConfigLoader {
  public static loadConfigFromFile(path: string): Configuration | ((args?: unknown) => Configuration) {
    if (!fs.existsSync(path)) {
      throw new Error(`Can't read webpack configuration from <${path}>`);
    }
    return importSync(path) as Configuration;
  }

  public static loadDevServerConfigurationFromFile(
    path: string
  ): DevServerConfiguration | ((args?: unknown) => DevServerConfiguration) {
    if (!fs.existsSync(path)) {
      throw new Error(`Can't read webpack-dev-server configuration from <${path}>`);
    }

    return importSync(path) as DevServerConfiguration;
  }
}
