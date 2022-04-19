import {
  loadConfiguration,
  SnowpackConfig,
  SnowpackUserConfig,
  startServer
} from 'snowpack';

const DEFAULT_CONFIG_FILE_PATH = './snowpack.config.js';

/** @type {import("snowpack").SnowpackUserConfig } */
const REACT_DEV_SNOWPACK_CONFIG = {
  plugins: ['@snowpack/plugin-react-refresh', ['@snowpack/plugin-typescript', {}]],
  devOptions: {
    open: true,
    hmr: true
  },
  mount: {
    public: { url: '/', static: true },
    src: '/dist'
  }
};

export class DevServer {
  public async runDevServer(config: SnowpackUserConfig): Promise<void> {
    const _config = await this._tryLoadConfig(DEFAULT_CONFIG_FILE_PATH, config);
    const _devServer = await startServer(
      { config: _config },
      {
        isDev: true,
        isWatch: true,
        preparePackages: true
      }
    );
  }

  private async _tryLoadConfig(
    configPath: string,
    overrides: SnowpackUserConfig
  ): Promise<SnowpackConfig | undefined> {
    try {
      return loadConfiguration(overrides, configPath);
    } catch (e) {
      return null;
    }
  }
}
