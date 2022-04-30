import { Plugin, PluginContext } from '@nfts/gmf';
import type { Configuration } from 'webpack';
import webpack from 'webpack';
import { WebpackConfigLoader } from './WebpackConfigLoader';
import * as path from 'path';

const NAME = 'WebpackPlugin';
const DESCRIPTION = 'Bundle With Webpack';

class WebpackPlugin implements Plugin {
  name: string = NAME;
  summary: string = DESCRIPTION;

  private readonly loader = new WebpackConfigLoader();

  apply({ getScopedLogger, hooks }: PluginContext): void | Promise<void> {
    const logger = getScopedLogger(NAME);

    process.env.NODE_ENV = 'development';

    hooks.bundle.add(NAME, bundle => {
      bundle.hooks.configure.add(NAME, (config?: Configuration): Configuration => {
        const configFromFile = this.loader.loadFromFile(path.resolve(process.cwd(), 'config/webpack.config.js'));

        if (typeof configFromFile === 'function') {
          return configFromFile('development');
        }

        return configFromFile;
      });

      bundle.hooks.compile.add(NAME, async compile => {
        const webpackConfig = (await bundle.hooks.configure.call(undefined)) as Configuration;
        compile.hooks.run.add(NAME, () => {
          const compiler = webpack(webpackConfig);
          compiler.run((error, stats) => {
            //
          });
        });
      });
    });
  }
}

export default new WebpackPlugin();
