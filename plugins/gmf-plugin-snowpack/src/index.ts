import { Plugin, PluginContext } from '@nfts/gmf';
import { DevServer } from './devServer';
import { BuildServer } from './buildServer';

class SnowpackDevPlugin implements Plugin {
  readonly name: 'SnowpackDevPlugin';
  readonly summary: 'Snowpack Development Plugin';

  apply(ctx: PluginContext): void {
    ctx.hooks.build.add(this.name, compile => {
      const { commandLineParameters, config: gmfConfig } = compile.options;
      compile.hooks.run.add(this.name, async () => {
        if (commandLineParameters.watch) {
          await new DevServer().runDevServer({ config: gmfConfig.config });
        } else {
          await new BuildServer().runBuildServer({});
        }
      });
    });
  }
}

export default new SnowpackDevPlugin();
