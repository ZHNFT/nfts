import { Plugin, PluginContext } from '../classes/Plugin';

class CleanPlugin extends Plugin {
  name: 'clean';
  summary: 'clean up dist folder';

  apply(ctx: PluginContext): void {
    ctx.hook.build.addHook('pre', async () => {
      await this.cleanUp();
    });
    ctx.hook.preview.addHook('pre', async () => {
      await this.cleanUp();
    });
  }

  cleanUp(): Promise<void> {
    return new Promise<void>(resolve => {
      console.log('Clean-up processing...');
      setTimeout(() => {
        console.log('Clean-up finished');
        resolve();
      }, 5000);
    });
  }
}

export default new CleanPlugin();
