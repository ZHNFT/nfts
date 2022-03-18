import { Plugin, PluginContext } from '../core/PluginManager';

export default class CleanPlugin extends Plugin<PluginContext> {
  name: 'clean';
  summary: 'clean up dist folder';

  apply = (ctx: PluginContext): void => {
    ctx.hook.build.addHook('before', this.cleanUp);
    ctx.hook.preview.addHook('before', this.cleanUp);
  };

  cleanUp = (): Promise<void> => {
    return new Promise<void>(resolve => {
      console.log('Clean-up processing...');
      setTimeout(() => {
        console.log('Clean-up finished');
        resolve();
      }, 5000);
    });
  };
}
