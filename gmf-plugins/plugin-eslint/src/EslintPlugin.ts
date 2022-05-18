import { PluginSession, Plugin } from "@nfts/gmf";
import { Linter, ESLint } from "eslint";
import { req, chalk, Utilities } from "@nfts/node-utils-library";
import path from "path";
import os from "os";

const NAME = "EslintPlugin";
const DESCRIPTION = "Code quality checker";

class EslintPlugin implements Plugin<void> {
  name = NAME;
  summary = DESCRIPTION;
  apply(session: PluginSession<void>): void {
    session.hooks.build.add(NAME, (build) => {
      build.hooks.lint.add(NAME, (test) => {
        test.hooks.run.add(NAME, async () => {
          await this.runEslintEngine();
        });
      });
    });

    session.hooks.bundle.add(NAME, (bundle) => {
      bundle.hooks.lint.add(NAME, (test) => {
        test.hooks.run.add(NAME, async () => {
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
      fix: true,
      cache: true,
      cacheLocation: path.resolve(process.cwd(), ".temp/.eslintcache"),
      ignore: true,
    });

    const lintResult = await lint.lintFiles(["**/*.{ts,js,jsx,tsx}"]);
    this.eslintMessagePrettier(lintResult);
  }

  private createBasicEslintConfiguration(): Linter.Config {
    const isUsingTypescript = this.isUsingTypescript();
    const isUsingReact = this.isUsingReact();

    return {};
  }

  // 格式化
  public eslintMessagePrettier(results: ESLint.LintResult[]) {
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
        const { message, severity, line, endLine, column, endColumn } =
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
          `      ${message}`,
          `      ${chalk.bgBlack(
            `${String(line + 1).padStart(String(endLine).length, " ")}:`
          )}  ${lines[line]}`,
        ]
          .filter(Boolean)
          .join(os.EOL);
      });

      // fileMap.set(filePath, formattedMessages);

      console.log(header());
      console.log("");
      console.log(formattedMessages.join(os.EOL));
    }
  }

  private isUsingTypescript(): boolean {
    try {
      req.resolve("./tsconfig.json");
      return true;
    } catch (_) {
      return false;
    }
  }

  private isUsingReact(): boolean {
    try {
      req.sync("react");
      return true;
    } catch (_) {
      return false;
    }
  }
}

export default new EslintPlugin();
