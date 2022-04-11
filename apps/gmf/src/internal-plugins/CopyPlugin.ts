import { Plugin, PluginContext } from '../classes/Plugin';

class CopyPlugin extends Plugin {
  name: 'copy';
  summary: 'Copy static files';

  apply(ctx: PluginContext): void {
    ctx.hook.build.addHook('finished', () => {
      console.log('process copy hook');
    });
  }
}

export default new CopyPlugin();
