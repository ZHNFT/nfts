import { Plugin, PluginContext } from '../classes/Plugin';

class CopyPlugin extends Plugin {
  name: 'copy';
  summary: 'Copy static files';

  apply(): void {
    console.log('Copy');
  }
}

export default new CopyPlugin();
