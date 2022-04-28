import { Measure } from '@nfts/node-utils-library';
import { Colors } from '@nfts/interactive-query';
import { Plugin, PluginContext } from '../../classes/Plugin';
import { TypescriptRunner } from './TypescriptRunner';
import { performance } from 'perf_hooks';

export interface TypescriptPluginOptions {
  // 开启 WatchMode；
  watch?: boolean;
  // 输出所有构建信息；
  verbose?: boolean;
  // tsconfig.json 文件相对路径
  tsconfigPath: string;
}

const PluginName = 'TypescriptPlugin';

class TypescriptPlugin implements Plugin {
  readonly name = 'TypescriptPlugin';
  readonly summary = 'Compile source code with typescript compiler';

  apply({ hooks, getScopeLogger }: PluginContext): void {
    const logger = getScopeLogger(PluginName);

    hooks.build.compile.add(this.name, compile => {
      const commandLineParameters = compile.options.commandLineParameters;
      compile.hooks.run.add(this.name, async () => {
        const tsRunner: TypescriptRunner = new TypescriptRunner({
          debug: logger
        });
        logger.log(
          `Build Start in ${
            commandLineParameters.watch
              ? Colors.green('DEVELOPMENT')
              : Colors.cyan('PRODUCTION')
          } mode`
        );
        const startTime = performance.now();
        await tsRunner._runBuild({ commandLineParameters }, () => {
          if (!commandLineParameters.watch) {
            const interval = performance.now() - startTime;
            logger.log(`Build end with time ${Measure.millisecondsFormat(interval)}`);
          }
        });
      });
    });
  }
}

export default new TypescriptPlugin();
