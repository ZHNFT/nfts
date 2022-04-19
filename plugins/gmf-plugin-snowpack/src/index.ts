import { Plugin, PluginContext } from '@nfts/gmf';
import { DevServer } from './devServer';
import { BuildServer } from './buildServer';

class SnowpackDevPlugin implements Plugin {
  name: 'SwcDevPlugin';
  summary: 'SWC development plugin';

  apply(ctx: PluginContext): void {
    ctx.hook.build.addHook(build => {
      build.hook.compile.addHook(async ({ commandLineParameters }) => {
        if (!commandLineParameters.snowpack) {
          return;
        }
        if (commandLineParameters.watch) {
          await new DevServer().runDevServer({
            mount: {
              public: '/',
              src: '/dist'
            },
            plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-typescript']
          });
        } else {
          await new BuildServer().runBuildServer({});
        }
      });
    });
  }
}

export default new SnowpackDevPlugin();
