import { Plugin, PluginContext } from '@nfts/gmf';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { WebpackConfigLoader } from './WebpackConfigLoader';
import * as path from 'path';
import { Constants } from './Constants';
import { WebpackRunner } from './WebpackRunner';

const NAME = 'WebpackPlugin';
const DESCRIPTION = 'Bundle With Webpack';

class WebpackPlugin implements Plugin {
  name: string = NAME;
  summary: string = DESCRIPTION;

  private webpackVersion: string;
  private webpackDevServerVersion: string;

  private readonly webpackRunner: WebpackRunner = new WebpackRunner();

  apply({ getScopedLogger, hooks }: PluginContext): void | Promise<void> {
    const logger = getScopedLogger(NAME);

    hooks.bundle.add(NAME, bundle => {
      process.env.NODE_ENV = bundle.cmdParams.watch ? 'development' : 'production';

      bundle.hooks.configure.add(NAME, (): Configuration => {
        const configPath = bundle.cmdParams.config || Constants.webpackConfig,
          devServerConfigPath = Constants.webpackDevServerConfig;

        logger.log(`Loading webpack & devServer configuration...`);

        // resolve webpack configuration
        let config = WebpackConfigLoader.loadConfigFromFile(path.resolve(process.cwd(), configPath));

        if (typeof config === 'function') {
          config = config(process.env.NODE_ENV);
        }

        let devServerConfig: DevServerConfiguration | ((args?: any) => DevServerConfiguration);

        // resolve dev-sever configuration
        try {
          devServerConfig = WebpackConfigLoader.loadDevServerConfigurationFromFile(
            path.resolve(process.cwd(), devServerConfigPath)
          );

          if (typeof devServerConfig === 'function') {
            devServerConfig = devServerConfig();
          }
        } catch (e) {
          logger.log(
            `Unable to resolve separate dev-server configuration from\n` +
              `separate file ${Constants.webpackDevServerConfig}\n`
          );
          logger.log(`Starting dev-server with configuration from ${configPath}`);
          devServerConfig = config.devServer;
        }

        return config;
      });

      bundle.hooks.compile.add(NAME, async compile => {
        const webpackConfig = (await bundle.hooks.configure.call(undefined)) as Configuration;
        compile.hooks.run.add(NAME, () => {
          this.webpackRunner.createCompilerAndRun(webpackConfig, { watch: bundle.cmdParams.watch });
        });
      });
    });
  }
}

export default new WebpackPlugin();
