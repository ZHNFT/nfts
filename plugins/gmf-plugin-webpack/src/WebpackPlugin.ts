import { Plugin, PluginContext } from '@nfts/gmf';
import type { Configuration } from 'webpack';

const NAME = 'WebpackPlugin';
const DESCRIPTION = 'Bundle With Webpack';

class WebpackPlugin implements Plugin {
  name: string = NAME;
  summary: string = DESCRIPTION;

  apply({ getScopeLogger, hooks }: PluginContext): void | Promise<void> {
    const logger = getScopeLogger(NAME);
    hooks.bundle.configure.add(NAME, (config?: Configuration): Configuration => {
      return {};
    });

    hooks.bundle.compile.add(NAME, async compile => {
      const config = (await hooks.bundle.configure.call(null)) as Configuration;
      compile.hooks.run.add(NAME, () => {
        //
        logger.log('WebpackPlugin');
      });
    });
  }
}

export default new WebpackPlugin();
