import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { Module, Url } from '@nfts/node-utils-library';
import type { IGmfConfig } from '@nfts/gmf';
import WebpackBar from 'webpackbar';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import type { Configuration, RuleSetRule } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export type TWebpackConfigurationFunction = (
  env?: 'production' | 'development' | string,
  config?: Configuration
) => Configuration;

export type TWebpackDevServerConfigurationFunction = (config?: DevServerConfiguration) => DevServerConfiguration;

const ModuleFileExtensions = [
  '.web.mjs',
  '.mjs',
  '.web.js',
  '.js',
  '.web.ts',
  '.ts',
  '.web.tsx',
  '.tsx',
  '.json',
  '.web.jsx',
  '.jsx'
];

export class WebpackConfigLoader {
  public static loadConfigFromFile(path: string): Configuration | TWebpackConfigurationFunction | undefined {
    if (fs.existsSync(path)) {
      return Module.sync(path) as Configuration | TWebpackConfigurationFunction;
    }
  }

  public static loadDevServerConfigurationFromFile(
    path: string
  ): DevServerConfiguration | TWebpackDevServerConfigurationFunction | undefined {
    if (fs.existsSync(path)) {
      return Module.sync(path) as DevServerConfiguration | TWebpackDevServerConfigurationFunction;
    }
  }

  public static createBasicWebpackConfiguration(gmfConfig: IGmfConfig): Configuration {
    const { isProd, isDev, sourcemap } = this.resolveEnv();
    const { publicUrl } = this.resolvePaths();

    return {
      mode: isDev ? 'development' : isProd ? 'production' : 'none',
      entry: this.resolveEntry(gmfConfig.bundle?.entry),
      output: {
        path: this.resolveOutput(gmfConfig.bundle?.output),
        filename: isProd ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
        chunkFilename: isProd ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
        publicPath: publicUrl
      },
      resolve: {
        extensions: this.resolveExtensions()
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
      ],
      module: this.createModule(),
      performance: false,
      stats: 'errors-warnings',
      target: ['browserslist'],
      bail: isDev,
      devtool: isProd ? (sourcemap ? 'source-map' : false) : isDev && 'cheap-module-source-map'
    };
  }

  public static async createBasicDevServerConfiguration(): Promise<DevServerConfiguration> {
    const { appHtml, publicUrl, appSrc } = this.resolvePaths();

    return this.getHttpServerConfig().then(({ port, host }) => {
      return {
        host,
        port,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*'
        },
        // Enable gzip compression of generated files.
        compress: true,
        static: {
          directory: appSrc,
          publicPath: [publicUrl],
          watch: {
            // ignored:
          }
        },
        client: {
          overlay: {
            errors: true,
            warnings: false
          }
        },
        historyApiFallback: {
          disableDotRule: true,
          index: appHtml
        },
        proxy: {
          /**
           * 拦截所有的请求，对浏览器刷新造成的路由请求，统一返回 index.html 文件
           */
          '/': {
            changeOrigin: true,
            bypass: req => {
              if (req.headers.accept?.indexOf('html') !== -1) {
                return '/index.html';
              }
              return appHtml;
            }
          }
        }
      };
    });
  }

  public static async getHttpServerConfig(): Promise<{ host: string; port: string | number }> {
    const HOST = process.env.HOST || '0.0.0.0';
    const PORT = process.env.PORT || 8080;

    return Url.chosePort(PORT).then(port => {
      return {
        port,
        host: HOST
      };
    });
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

  public static isUsingJSXRuntime(): boolean {
    try {
      Module.resolve('react/jsx-runtime');
      return true;
    } catch (error) {
      return false;
    }
  }

  private static resolveExtensions(): string[] {
    const { isTypescriptProject } = this.resolveEnv();

    return ModuleFileExtensions.filter(ext => {
      return isTypescriptProject ? true : ext.endsWith('ts') || ext.endsWith('tsx');
    });
  }

  public static createModule(): Configuration['module'] {
    const { sourcemap } = this.resolveEnv();

    const module: Configuration['module'] = {
      parser: {
        javascript: {
          exportsPresence: 'error'
        }
      },
      rules: [
        sourcemap && {
          enforce: 'pre',
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve('source-map-loader')
        },
        {
          oneOf: [
            ...this.getAssetLoader(),
            ...this.getBabelLoader(),
            {
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: 'asset/resource'
            }
          ]
        }
      ].filter(Boolean) as RuleSetRule[]
    };

    return module;
  }

  private static env: {
    sourcemap: boolean;
    isDev: boolean;
    isProd: boolean;
    isTypescriptProject: boolean;
    isReactProject: boolean;
    isJSXRuntime: boolean;
  };

  private static getBabelLoader(): RuleSetRule[] {
    const { isJSXRuntime, isProd, sourcemap } = this.resolveEnv();
    return [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          customize: require.resolve('babel-preset-react-app/webpack-overrides'),
          presets: [
            [
              require.resolve('babel-preset-react-app'),
              {
                runtime: isJSXRuntime ? 'automatic' : 'classic'
              }
            ]
          ],
          configFile: false,
          // plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
          cacheDirectory: true,
          cacheCompression: false,
          compact: isProd
        }
      },
      {
        test: /\.(js|mjs)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          configFile: false,
          compact: false,
          presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
          cacheDirectory: true,
          // See #6846 for context on why cacheCompression is disabled
          cacheCompression: false,
          sourceMaps: sourcemap,
          inputSourceMap: sourcemap
        }
      }
    ];
  }

  // 处理静态文件，
  private static getAssetLoader(): RuleSetRule[] {
    return [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10000
          }
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }]
              },
              titleProp: true,
              ref: true
            }
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash].[ext]'
            }
          }
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/]
        }
      }
    ];
  }

  private static resolveEntry(entry?: string): string {
    const { appRoot } = this.resolvePaths();
    return entry ? path.resolve(appRoot, entry) : path.resolve(appRoot, 'src/index');
  }

  private static resolveOutput(relPath?: string): string {
    return path.resolve(
      //
      process.cwd(),
      relPath ?? './build'
    );
  }

  private static resolveEnv(): {
    sourcemap: boolean;
    isDev: boolean;
    isProd: boolean;
    isTypescriptProject: boolean;
    isReactProject: boolean;
    isJSXRuntime: boolean;
  } {
    if (this.env) {
      return this.env;
    }

    const isDev = process.env.NODE_ENV === 'development';
    const isProd = process.env.NODE_ENV === 'production';
    const isTypescriptProject = this.isUsingTypescript();
    const isReactProject = this.isUsingReact();
    const isJSXRuntime = this.isUsingJSXRuntime();
    const sourcemap = process.env.SOURCEMAP === 'true';

    this.env = {
      isDev,
      isProd,
      isReactProject,
      isTypescriptProject,
      isJSXRuntime,
      sourcemap
    };

    return this.env;
  }

  public static resolvePaths(): {
    appRoot: string;
    appSrc: string;
    appPublic: string;
    appHtml: string;
    appPackageJson: string;
    appTsConfig: string;
    appJsConfig: string;
    appNodeModule: string;
    publicUrl: string;
  } {
    const appRoot = fs.realpathSync(process.cwd());

    const resolveApp = (relativePath: string): string => {
      return path.resolve(appRoot, relativePath);
    };

    const paths = {
      appRoot,
      appSrc: resolveApp('src'),
      appPublic: resolveApp('public'),
      appHtml: resolveApp('index.html'),
      appPackageJson: resolveApp('package.json'),
      appTsConfig: resolveApp('tsconfig.json'),
      appJsConfig: resolveApp('jsconfig.json'),
      appNodeModule: resolveApp('node_modules'),

      publicUrl: this.getPublicPathOrUrl()
    };

    return paths;
  }

  private static getPublicPathOrUrl(): string {
    const localBase = 'http://0.0.0.0:8080';
    // publicPath 可以使路径也可以是一个地址，但是必须以 / 结尾，
    // 检查路径是否合法，竟可能地完善路径；
    const envPublicUrl = process.env.PUBLIC_URL;
    if (!envPublicUrl) return '/';
    const publicUrl = new URL(envPublicUrl, localBase);

    if (publicUrl.pathname.endsWith('/')) {
      return publicUrl.href;
    } else {
      return `${publicUrl.origin}${publicUrl.pathname}/`;
    }
  }
}
