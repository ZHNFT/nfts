import { Plugin, PluginContext } from '@nfts/gmf';
import type { Configuration } from 'webpack';

const NAME = 'WebpackPlugin';
const DESCRIPTION = 'Bundle With Webpack';

class WebpackPlugin implements Plugin {
  name: string = NAME;
  summary: string = DESCRIPTION;

  apply({ getScopedLogger, hooks }: PluginContext): void | Promise<void> {
    const logger = getScopedLogger(NAME);

    hooks.bundle.add(NAME, bundle => {
      bundle.hooks.configure.add(NAME, (config?: Configuration): Configuration => {
        // load config from local
        if (!config) {
          return {
            entry: './index.ts'
          };
        }

        return config;
      });

      bundle.hooks.compile.add(NAME, async compile => {
        const webpackConfig = (await bundle.hooks.configure.call(undefined)) as Configuration;

        compile.hooks.run.add(NAME, () => {
          //
        });
      });
    });
  }
}

export default new WebpackPlugin();
