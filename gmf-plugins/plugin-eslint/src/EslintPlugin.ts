import path from "path";
import os from "os";
import { PluginSession, Plugin } from "@nfts/gmf";
import { ESLint } from "eslint";
import { Command, Debug } from "@nfts/noddy";
import { FlagParameter, ValueOfParameters } from "@nfts/argparser";
import { chalk, Utilities } from "@nfts/node-utils-library";

const NAME = "EslintPlugin";
const DESCRIPTION = "Code quality checker";

type EslintPluginParameters = {
  fix: FlagParameter;
  cache: FlagParameter;
};

type EslintPluginParametersValue = ValueOfParameters<EslintPluginParameters>;

class EslintPlugin
  implements Plugin<EslintPluginParametersValue>, EslintPluginParameters
{
  name = NAME;
  summary = DESCRIPTION;

  fix!: FlagParameter;
  cache!: FlagParameter;

  logger!: Debug;

  apply(session: PluginSession<EslintPluginParametersValue>): void {
    this.onParametersDefinition(session.command);

    this.logger = session.getScopedLogger(NAME);

    session.hooks.build.add(NAME, (build) => {
      build.hooks.lint.add(NAME, (lint) => {
        lint.hooks.run.add(NAME, async () => {
          await this.runEslintEngine();
        });
      });
    });

    session.hooks.bundle.add(NAME, (bundle) => {
      bundle.hooks.lint.add(NAME, (lint) => {
        lint.hooks.run.add(NAME, async () => {
          await this.runEslintEngine();
        });
      });
    });
  }

  public async runEslintEngine(): Promise<void> {
    // 创建 ESLint 实例
    const lint = new ESLint({
      cwd: process.cwd(),
      useEslintrc: true,
      fix: this.fix.value ?? false,
      cache: true,
      cacheLocation: path.resolve(process.cwd(), ".temp/.eslintcache"),
      ignore: true,
    });

    const lintResult = await lint.lintFiles(["**/*.{ts,js,jsx,tsx}"]);
    this.eslintMessagePrettier(lintResult);
  }

  // 格式化
  public eslintMessagePrettier(results: ESLint.LintResult[]): void {
    // const fileMap = new Map<string, string[]>();
    let fixableCount = 0;

    for (const lintResult of results) {
      const {
        errorCount,
        warningCount,
        fixableErrorCount,
        fixableWarningCount,
        filePath,
        messages,
        source,
      } = lintResult;

      if (errorCount === 0 && warningCount === 0) {
        continue;
      }

      fixableCount += fixableErrorCount + fixableWarningCount;

      const lines = (source as string).split("\n");

      const header = () =>
        `→ ${chalk.yellow(path.relative(process.cwd(), filePath))}`;

      const formattedMessages = messages.map((lintMessage) => {
        const { message, line, endLine, column, endColumn, ruleId } =
          lintMessage;

        return [
          line > 1 &&
            `      ${chalk.bgBlack(
              `${String(line - 1).padStart(String(endLine).length, " ")}:`
            )} ${lines[line - 2]}`,
          `      ${chalk.bgBlack(
            `${String(line).padStart(String(endLine).length, " ")}:`
          )} ${lines[line - 1]}`,
          `      ${Utilities.array
            .arrayOf(column + 2, " ")
            .join("")}${Utilities.array
            .arrayOf((endColumn || column) - column, chalk.red("~"))
            .join("")}`,
          `      ${chalk.red(message)}(${chalk.dim(ruleId)})`,
          " ",
        ]
          .filter(Boolean)
          .join(os.EOL);
      });

      this.logger.log(
        os.EOL +
          `${header()}` +
          os.EOL +
          `${formattedMessages.join(os.EOL)}` +
          os.EOL
      );
    }

    if (fixableCount > 0) {
      console.log(
        chalk.red(
          `${fixableCount} errors and warnings potentially fixable with the \`--fix\` option`
        )
      );
    }
  }

  private onParametersDefinition(command: Command) {
    this.fix = command.flagParameter({
      name: "--fix",
      summary: "Automatically fix problems",
    });

    this.cache = command.flagParameter({
      name: "--cache",
      summary: "Only check changed files",
    });
  }
}

export default new EslintPlugin();
