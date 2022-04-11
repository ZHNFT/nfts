import { Plugin, PluginContext } from '../classes/Plugin';

interface CleanPluginOptions {
  dist: string;
  force?: string;
}

class CleanPlugin extends Plugin<CleanPluginOptions> {
  name: 'clean';
  summary: 'clean up dist folder';

  apply(ctx: PluginContext, options: CleanPluginOptions): void {
    ctx.hook.build.addHook('clean', () => {
      console.log('process clean hook');
    });
  }
}

export default new CleanPlugin();
