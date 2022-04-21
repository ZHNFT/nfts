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

class TypescriptPlugin implements Plugin {
  readonly name = 'TypescriptPlugin';
  readonly summary = '使用 tsc 作为内部使用的编译器来将 tsx 转换成 js';

  private readonly tsRunner: TypescriptRunner;

  constructor() {
    this.tsRunner = new TypescriptRunner();
  }

  apply(ctx: PluginContext): void {
    ctx.hook.build.add(this.name, build => {
      const logger = build.getScopedLogger(this.name);
      build.hook.compile.add(this.name, compile => {
        compile.hook.run.add(this.name, async ({ commandLineParameters, hook }) => {
          logger.log(
            `Build Start in ${
              commandLineParameters.watch ? Colors.green('watch') : Colors.cyan('build')
            } mode`
          );
          const startTime = performance.now();
          await this.tsRunner._runBuild({ commandLineParameters }, () => {
            if (!commandLineParameters.watch) {
              const interval = performance.now() - startTime;
              logger.log(`Build end with time ${Measure.millisecondsFormat(interval)}`);
            }
          });
        });
      });
    });
  }
}

export default new TypescriptPlugin();
