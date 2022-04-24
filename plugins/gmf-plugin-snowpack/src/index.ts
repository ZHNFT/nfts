import { Plugin, PluginContext } from '@nfts/gmf';
import { DevServer } from './devServer';
import { BuildServer } from './buildServer';

class SnowpackDevPlugin implements Plugin {
	readonly name: 'SnowpackDevPlugin';
	readonly summary: 'Snowpack Development Plugin';

	apply(ctx: PluginContext): void {
		ctx.hook.build.add(this.name, build => {
			build.hook.compile.add(
				this.name,
				async ({ commandLineParameters, config: gmfConfig }) => {
					if (commandLineParameters.watch) {
						await new DevServer().runDevServer({ config: gmfConfig.config });
					} else {
						await new BuildServer().runBuildServer({});
					}
				}
			);
		});
	}
}

export default new SnowpackDevPlugin();
