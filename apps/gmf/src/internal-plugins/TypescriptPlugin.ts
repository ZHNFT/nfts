import path from 'path';
import { Measure } from '@nfts/node-utils-library';
import { Plugin, PluginContext } from '../classes/Plugin';
import Constants from '../Constants';
import { TypescriptRunner } from './typescript/TypescriptRunner';
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
      build.hook.compile.add(this.name, compile => {
        compile.hook.run.add(
          this.name,
          async ({ commandLineParameters, hook, logger }) => {
            // 开启snowpack的开发模式
            if (commandLineParameters.snowpack) {
              return;
            }
            logger.log(` ---- TS build Start`);
            const startTime = performance.now();
            if (!commandLineParameters.tsconfig) {
              commandLineParameters.tsconfig = Constants.DEFAULT_TSCONFIG_PATH;
            } else {
              if (!path.isAbsolute(commandLineParameters.tsconfig)) {
                commandLineParameters.tsconfig = path.resolve(
                  process.cwd(),
                  commandLineParameters.tsconfig
                );
              }
            }

            if (commandLineParameters.watch) {
              await this.tsRunner._runWatchBuild({
                tsconfigPath: commandLineParameters.tsconfig
              });
            } else {
              await this.tsRunner._runIncrementalBuild(commandLineParameters, () => {
                logger.log('Start Emit Hook');
                void hook.emit.emit();
              });
            }

            const interval = performance.now() - startTime;

            logger.log(
              ` ---- TS build end, spent ${Measure.millisecondsFormat(interval)}s ----`
            );
          }
        );
      });
    });
  }
}

export default new TypescriptPlugin();
