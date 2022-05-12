import { PluginSession, Plugin } from '@nfts/gmf';
import type { Configuration } from 'webpack';

const NAME = 'WebpackTypescriptPlugin';
const DESCRIPTION = 'Add typescript support in webpack configuration';

class WebpackTypescriptPlugin extends Plugin {
  name = NAME;
  summary = DESCRIPTION;

  apply(session: PluginSession) {
    const { hooks, command, configuration } = session;
    hooks.bundle.add(NAME, bundle => {
      bundle.hooks.configure.add(NAME, (config: Configuration) => {
        const isDev = !!bundle.cmdParams.watch;
      });
    });
  }
}

export default new WebpackTypescriptPlugin();
