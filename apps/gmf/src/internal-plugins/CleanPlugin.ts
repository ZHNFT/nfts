import { Plugin, PluginContext } from '../classes/Plugin';

interface CleanPluginOptions {
  dist: string;
  force?: string;
}

class CleanPlugin extends Plugin<CleanPluginOptions> {
  name: 'clean';
  summary: 'clean up dist folder';

  apply(): void {
    console.log('cleanup');
  }
}

export default new CleanPlugin();
