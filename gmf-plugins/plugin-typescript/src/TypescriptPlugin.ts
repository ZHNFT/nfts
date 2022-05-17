import { Measure } from "@nfts/noddy";
import { Plugin, PluginSession } from "@nfts/gmf";
import { chalk } from "@nfts/node-utils-library";
import { TypescriptRunner } from "./TypescriptRunner";

export interface TypescriptPluginOptions {
  // 开启 WatchMode；
  watch?: boolean;
  // 输出所有构建信息；
  verbose?: boolean;
  // tsconfig.json 文件相对路径
  tsconfigPath: string;
}

const NAME = "TypescriptPlugin";
const DESCRIPTION = "Default compiler for gmf project";

export interface TypescriptPluginOptions {
  NO_OPTIONS_RIGHT_NOW: unknown;
}

class TypescriptPlugin implements Plugin {
  readonly name = NAME;
  readonly summary = DESCRIPTION;

  readonly typescriptVersion!: string;

  apply({ hooks, getScopedLogger }: PluginSession): void {
    const logger = getScopedLogger(NAME);

    hooks.build.add(NAME, (build) => {
      build.hooks.compile.add(NAME, (compile) => {
        compile.hooks.run.add(NAME, async () => {
          const tsRunner: TypescriptRunner = new TypescriptRunner({
            debug: logger,
          });

          logger.log(
            `Start \`tsc\` compile process in ${
              compile.cmdParams.watch
                ? chalk.green("DEVELOPMENT")
                : chalk.cyan("PRODUCTION")
            } mode`
          );

          await Measure.taskAsync(
            async () =>
              await tsRunner._runBuild(
                { commandLineParameters: compile.cmdParams },
                function onEmitCallback() {
                  // After emit
                }
              ),
            function taskExecutedCallback(spendTimeMS) {
              if (!build.cmdParams.watch) {
                logger.log(
                  `Process end with time ${Measure.msFormat(spendTimeMS)}`
                );
              }
            }
          );
        });
      });
    });
  }
}

export default new TypescriptPlugin();
