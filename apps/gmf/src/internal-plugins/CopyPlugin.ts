import { Plugin, PluginContext } from '../classes/Plugin';

class CopyPlugin extends Plugin {
  name: 'copy';
  summary: 'Copy static files';

  apply(ctx: PluginContext): void {
    console.log('Copy folder & files!');
  }
}

export default new CopyPlugin();
