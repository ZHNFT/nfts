import { PluginSession, Plugin } from "@nfts/gmf";
import { Linter, ESLint } from "eslint";
import { req } from "@nfts/node-utils-library";
import path from "path";

const NAME = "EslintPlugin";
const DESCRIPTION = "Code quality checker";

class EslintPlugin implements Plugin<void> {
  name = NAME;
  summary = DESCRIPTION;
  apply(session: PluginSession<void>): void {
    session.hooks.build.add(NAME, (build) => {
      build.hooks.test.add(NAME, (test) => {
        test.hooks.run.add(NAME, async () => {
          await this.runEslintEngine();
        });
      });
    });
  }

  // 执行 Eslint
  public async runEslintEngine(): Promise<void> {
    const lintResult = await new ESLint({
      cwd: process.cwd(),
      useEslintrc: true,
      fix: true,
      cache: true,
      cacheLocation: path.resolve(process.cwd(), ".eslintcache"),
    }).lintFiles(["**/*.{ts,js,jsx,tsx}"]);

    console.log(lintResult);
  }

  private createBasicEslintConfiguration(): Linter.Config {
    return {};
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
