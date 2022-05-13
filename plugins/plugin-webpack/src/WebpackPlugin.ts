import { Plugin, PluginSession, BundleCommandParameters } from '@nfts/gmf';
import { FlagParameter } from '@nfts/argparser';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { WebpackConfigLoader } from './WebpackConfigLoader';
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

  sourceMap: FlagParameter;

  apply({ getScopedLogger, hooks, configuration: gmfConfiguration, command }: PluginSession): void | Promise<void> {
    this.sourceMap = command.flagParameter({
      name: '--sourcemap',
      shortName: '-s',
      summary: 'Generate source-map'
    });

    hooks.bundle.add(NAME, bundle => {
      this.setupEnv(bundle.cmdParams);

      bundle.hooks.configure.add(NAME, async (): Promise<Configuration> => {
        let configPath = WebpackPlugin.resolveConfigPath(),
          devConfigPath = WebpackPlugin.resolveDevServerConfigPath(),
          configuration: Configuration,
          devConfiguration: DevServerConfiguration;

        /**
         * 创建一个默认的 webpack 配置；
         * 默认配置以一个 React 应用为蓝本而创建；
         */
        const defaultConfig = WebpackConfigLoader.createBasicWebpackConfiguration(gmfConfiguration.config);

        if (configPath) {
          configPath = path.resolve(process.cwd(), configPath);
          const configFromFile = WebpackConfigLoader.loadConfigFromFile(configPath);

          if (typeof configFromFile === 'function') {
            configuration = configFromFile(process.env.NODE_ENV, defaultConfig);
          }
        } else {
          configuration = defaultConfig;
        }

        if (devConfigPath) {
          devConfigPath = path.resolve(process.cwd(), devConfigPath);
          const configFromFile = WebpackConfigLoader.loadDevServerConfigurationFromFile(devConfigPath);

          if (typeof configFromFile === 'function') {
            devConfiguration = configFromFile(defaultConfig.devServer);
          }
        } else {
          devConfiguration = await WebpackConfigLoader.createBasicDevServerConfiguration();
        }

        return Object.assign(configuration, { devServer: devConfiguration });
      });

      bundle.hooks.compile.add(NAME, async compile => {
        const webpackConfig = (await bundle.hooks.configure.call(undefined)) as Configuration;
        compile.hooks.run.add(NAME, () => {
          this.webpackRunner.createCompilerAndRun(webpackConfig, { watch: bundle.cmdParams.watch });
        });
      });
    });
  }

  private setupEnv = ({ watch, config }: BundleCommandParameters) => {
    const isDev = watch === true;
    // todo Add test env support

    // 可能在使用的一些.env文件
    const envFiles = [
      `.env`,
      `.env.${isDev ? 'development' : 'production'}`,
      `.env.${isDev ? 'development' : 'production'}.local`
    ]
      .map(envFile => path.resolve(process.cwd(), envFile))
      .filter(fs.existsSync);

    envFiles.forEach(envFile => {
      dotenv.config({
        path: envFile
      });
    });

    const extraEnvFromCommandLine: Record<string, string> = {
      WEBPACK_CONFIG: config,
      SOURCEMAP: this.sourceMap.value ? 'true' : undefined,
      NODE_ENV: isDev ? 'development' : 'production'
    };

    Object.keys(extraEnvFromCommandLine).map((key: string) => {
      if (extraEnvFromCommandLine[key]) {
        process.env[key] = extraEnvFromCommandLine[key];
      }
    });
  };

  private static resolveConfigPath(): string | undefined {
    const configPathDefinedInEnv = process.env.WEBPACK_CONFIG;
    const maybeConfigPath = Constants.maybeWebpackConfig;
    const defaultConfigPath = Constants.webpackConfig;

    const maybeConfigPathExist = fs.existsSync(path.resolve(process.cwd(), maybeConfigPath));
    const defaultConfigPathExist = fs.existsSync(path.resolve(process.cwd(), defaultConfigPath));

    return (
      configPathDefinedInEnv ??
      (defaultConfigPathExist ? defaultConfigPath : maybeConfigPathExist ? maybeConfigPath : undefined)
    );
  }

  private static resolveDevServerConfigPath(): string | undefined {
    const configPathDefinedInEnv = process.env.WEBPACK_CONFIG;
    const maybeConfigPath = Constants.maybeWebpackDevServerConfig;
    const defaultConfigPath = Constants.webpackDevServerConfig;

    const maybeConfigPathExist = fs.existsSync(path.resolve(process.cwd(), maybeConfigPath));
    const defaultConfigPathExist = fs.existsSync(path.resolve(process.cwd(), defaultConfigPath));

    return (
      configPathDefinedInEnv ??
      (defaultConfigPathExist ? defaultConfigPath : maybeConfigPathExist ? maybeConfigPath : undefined)
    );
  }
}

export default new WebpackPlugin();
