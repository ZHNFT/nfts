import { Measure, Command } from "@nfts/noddy";
import { StringParameter, ValueOfParameters } from "@nfts/argparser";
import { chalk } from "@nfts/node-utils-library";
import { TypescriptRunner } from "./TypescriptRunner";
import { Plugin, PluginSession } from "../../classes/Plugin";

const NAME = "TypescriptPlugin";
const DESCRIPTION = "Default compiler for gmf project";

type TypescriptPluginParameters = {
  readonly project: StringParameter;
};

type TypescriptPluginParametersValue =
  ValueOfParameters<TypescriptPluginParameters>;

class TypescriptPlugin
  implements
    Plugin<TypescriptPluginParametersValue>,
    TypescriptPluginParameters
{
  readonly name = NAME;
  readonly summary = DESCRIPTION;

  readonly typescriptVersion!: string;

  project!: StringParameter;

  apply({
    hooks,
    getScopedLogger,
    command,
  }: PluginSession<TypescriptPluginParametersValue>): void {
    const logger = getScopedLogger(NAME);
    this.onDefineParameters(command);
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
              await tsRunner
                ._runBuild(
                  {
                    watch: compile.cmdParams.watch,
                    tsconfig: this.project.value,
                  },
                  function onEmitCallback() {
                    // After emit
                  }
                )
                .catch((e) => {
                  logger.log(e.message);
                }),
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

  onDefineParameters(command: Command) {
    this.project = command.stringParameter({
      name: "--project",
      shortName: undefined,
      summary:
        "Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.",
    });
  }
}

export default new TypescriptPlugin();
