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

const NAME = 'TypescriptPlugin';
const DESCRIPTION = '';

export interface TypescriptPluginOptions {
  NO_OPTIONS_RIGHT_NOW: unknown;
}

class TypescriptPlugin implements Plugin {
  readonly name = NAME;
  readonly summary = DESCRIPTION;

  apply({ hooks, getScopedLogger }: PluginContext, _: TypescriptPluginOptions): void {
    const logger = getScopedLogger(NAME);

    hooks.build.add(NAME, build => {
      build.hooks.compile.add(NAME, compile => {
        compile.hooks.run.add(NAME, async () => {
          const tsRunner: TypescriptRunner = new TypescriptRunner({
            debug: logger
          });
          logger.log(
            `Build Start in ${compile.cmdParams.watch ? Colors.green('DEVELOPMENT') : Colors.cyan('PRODUCTION')} mode`
          );
          const startTime = performance.now();
          await tsRunner._runBuild({ commandLineParameters: compile.cmdParams }, () => {
            if (!compile.cmdParams.watch) {
              const interval = performance.now() - startTime;
              logger.log(`Build end with time ${(interval / 1000).toFixed(2)}s`);
            }
          });
        });
      });
    });
  }
}

export default new TypescriptPlugin();
