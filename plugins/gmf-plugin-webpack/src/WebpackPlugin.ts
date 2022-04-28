import { Plugin, PluginContext } from '@nfts/gmf';

const NAME = 'WebpackPlugin';
const DESCRIPTION = 'Bundle With Webpack';

class WebpackPlugin implements Plugin {
  name: string = NAME;
  summary: string = DESCRIPTION;
  apply({ getScopeLogger }: PluginContext): void | Promise<void> {
    const logger = getScopeLogger(NAME);
    throw new Error('Method not implemented.');
    logger.log('In WebpackPlugin');
  }
}

export default new WebpackPlugin();
