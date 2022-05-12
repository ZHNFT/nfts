import { Plugin, PluginSession, BundleCommandParameters } from '@nfts/gmf';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import * as path from 'path';
import * as fs from 'fs';
import dotenv from 'dotenv';
import { WebpackConfigLoader, TWebpackConfigurationFunction } from './WebpackConfigLoader';
import { Constants } from './Constants';
import { WebpackRunner } from './WebpackRunner';

const NAME = 'WebpackPlugin';
const DESCRIPTION = 'Bundle With Webpack';

const ModuleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx'
];

class WebpackPlugin implements Plugin {
  name: string = NAME;
  summary: string = DESCRIPTION;

  private webpackVersion: string;
  private webpackDevServerVersion: string;

  private readonly webpackRunner: WebpackRunner = new WebpackRunner();

  apply({ getScopedLogger, hooks }: PluginSession): void | Promise<void> {
    const logger = getScopedLogger(NAME);
    hooks.bundle.add(NAME, bundle => {
      this.setupEnv(bundle.cmdParams);

      bundle.hooks.configure.add(NAME, (): Configuration => {
        let configPath = this.resolveConfigPath(),
          devConfigPath = this.resolveDevServerConfigPath(),
          configuration: Configuration,
          devConfiguration: DevServerConfiguration;

        /**
         * 创建一个默认的 webpack 配置；
         * 默认配置以一个 React 应用为蓝本而创建；
         */
        const defaultConfig = WebpackConfigLoader.createBasicWebpackConfiguration();

        if (configPath) {
          configPath = path.resolve(process.cwd(), configPath);
          const configFromFile = WebpackConfigLoader.loadConfigFromFile(configPath);

          if (typeof configFromFile === 'function') {
            configuration = configFromFile(process.env.NODE_ENV, defaultConfig);
          }
        } else {
          configuration = defaultConfig;
        }

        let devServerConfig: TWebpackConfigurationFunction;

        if (devConfigPath) {
          devConfigPath = path.resolve(process.cwd(), devConfigPath);
          const configFromFile = WebpackConfigLoader.loadDevServerConfigurationFromFile(devConfigPath);

          if (typeof configFromFile === 'function') {
            devConfiguration = configFromFile(defaultConfig.devServer);
          }
        } else {
          devConfiguration = WebpackConfigLoader.createBasicDevServerConfiguration(defaultConfig.devServer);
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
      WEBPACK_CONFIG: config
    };

    Object.keys(extraEnvFromCommandLine).map((key: string) => {
      if (extraEnvFromCommandLine[key]) {
        process.env[key] = extraEnvFromCommandLine[key];
      }
    });
  };

  private resolveConfigPath(): string | undefined {
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

  private resolveDevServerConfigPath(): string | undefined {
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
