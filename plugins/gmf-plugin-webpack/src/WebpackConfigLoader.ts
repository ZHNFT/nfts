import * as fs from 'fs';
import * as path from 'path';
import { Json, Module } from '@nfts/node-utils-library';
import type { IGmfConfig } from '@nfts/gmf';
import WebpackBar from 'webpackbar';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export type TWebpackConfigurationFunction = (
  env: 'production' | 'development' | string,
  config: Configuration
) => Configuration;

export type TWebpackDevServerConfigurationFunction = (config: DevServerConfiguration) => DevServerConfiguration;

export class WebpackConfigLoader {
  public static loadConfigFromFile(path: string): Configuration | TWebpackConfigurationFunction {
    if (fs.existsSync(path)) {
      return Module.sync(path);
    }
  }

  public static loadDevServerConfigurationFromFile(
    path: string
  ): DevServerConfiguration | TWebpackDevServerConfigurationFunction {
    if (fs.existsSync(path)) {
      return Module.sync(path);
    }
  }

  public static createBasicWebpackConfiguration(gmfConfig: IGmfConfig): Configuration {
    const isDev = process.env.NODE_ENV === 'development';

    return {
      mode: 'development',
      entry: gmfConfig.bundle.entry ?? './src/index.js',
      experiments: {
        outputModule: true
      },
      output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js',
        libraryTarget: 'module'
      },
      plugins: [
        new HTMLWebpackPlugin(
          Object.assign(
            {},
            {
              inject: true,
              template: './index.html'
            },
            !isDev
              ? {
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                  }
                }
              : undefined
          )
        ),
        new WebpackBar()
      ]
    };
  }

  public static createBasicDevServerConfiguration(config: DevServerConfiguration): DevServerConfiguration {
    // todo 检查参数config
    return {
      host: '0.0.0.0',
      port: '8080'
    };
  }

  public static isUsingReact(): boolean {
    try {
      Module.resolve('react');
      return true;
    } catch (error) {
      return false;
    }
  }

  public static isUsingTypescript(): boolean {
    try {
      Module.resolve('typescript');
      return true;
    } catch (error) {
      return false;
    }
  }

  public static createModule() {
    const isUsingTypescript = WebpackConfigLoader.isUsingTypescript();
    const isUsingReact = WebpackConfigLoader.isUsingReact();
  }
}
