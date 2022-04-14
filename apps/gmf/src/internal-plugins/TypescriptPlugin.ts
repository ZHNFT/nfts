import path from 'path';
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

class TypescriptPlugin implements Plugin<TypescriptPluginOptions> {
  readonly name = 'TypescriptPlugin';
  readonly summary = '使用 tsc 作为内部使用的编译器来将 tsx 转换成 js';

  private readonly tsRunner: TypescriptRunner;

  constructor() {
    this.tsRunner = new TypescriptRunner();
  }

  apply(ctx: PluginContext): void {
    ctx.hook.build.addHook(build => {
      build.hook.compile.addHook(compile => {
        compile.hook.run.addHook(async ({ commandLineParameters, logger }) => {
          console.log(' ---- TS build start ----');
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

          if (commandLineParameters.watchMode) {
            await this.tsRunner._runWatchBuild(
              {
                tsconfigPath: commandLineParameters.tsconfig
              },
              () => {
                //
              }
            );
          } else {
            await this.tsRunner._runIncrementalBuild(commandLineParameters, () => {
              console.log('after emitted');
            });
          }

          const endTime = performance.now() - startTime;

          console.log(` ---- TS build end, spent ${(endTime / 1000).toFixed(4)}s ----`);
        });
      });
    });
  }
}

export default new TypescriptPlugin();
