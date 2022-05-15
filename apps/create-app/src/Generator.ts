import { spawnSync } from "child_process";
import { resolve } from "path";
import { writeFile } from "fs/promises";
import { ICreationParameters, Platforms } from ".";
import { Execution } from "@nfts/node-utils-library";
import type { Config } from "prettier";

export type TUserInfo = { name: string; email: string };
export type TPackageJsonInfo = {
  usingTs?: boolean;
  platform?: keyof typeof Platforms;
};

export class Generator {
  // 所有待创建的文件都先缓存在该数据结构中
  private static fileEmitTasks: Execution.TaskFunc<void, void>[];

  public static async run(
    opts: ICreationParameters,
    cwd: string = process.cwd()
  ) {
    // 重置所有文件写入的 TASK
    this.fileEmitTasks = [];
    const { ts, platform } = opts;
    const targetPlatform = (platform?.[0] || "node") as Platforms;
    let dependencies = ["@nfts/gmf", "@nfts/eslint-config"];
    if (ts) {
      dependencies.push("typescript");
    }
    switch (targetPlatform) {
      case "node":
        break;
      case "react":
        dependencies = dependencies.concat([
          "react",
          "react-dom",
          "@nfts/plugin-webpack",
        ]);
        break;
      default:
        break;
    }

    this.makePackageJson(targetPlatform, cwd);
    this.makeTemplateFiles(targetPlatform, cwd);
    // 开始写入文件
    await Execution.parallel(this.fileEmitTasks, undefined);
    console.log("文件写入结束");
  }

  /*
   * 获取当前用户的 git user 配置信息
   * */
  public static getCurrentUserInfo(): TUserInfo {
    try {
      const name = spawnSync("git", [
        "config",
        "--global",
        "user.name",
      ]).stdout.toString();
      const email = spawnSync("git", [
        "config",
        "--global",
        "user.email",
      ]).stdout.toString();
      return {
        name: name.replace("\n", ""),
        email: email.replace("\n", ""),
      };
    } catch (e) {
      return {
        name: "",
        email: "",
      };
    }
  }

  public static async installDeps(): Promise<void> {
    //
  }

  // 生成 package.json 文件
  private static makePackageJson(platform: Platforms, cwd: string): void {
    const userInfo = this.getCurrentUserInfo();

    const platformCommand = platform === Platforms.react ? "bundle" : "build";

    const pkg = {
      name: "new_project",
      version: "0.0.1",
      main: "./dist/index.js",
      types: "./dist/index.d.ts",
      author: {
        name: userInfo.name,
        email: userInfo.email,
        url: "",
      },
      publishConfig: {
        access: "public",
      },
      scripts: {
        test: `gmf ${platformCommand} --test`,
        dev: `gmf ${platformCommand} --watch`,
        build: `gmf ${platformCommand} --test --clean`,
      },
      dependencies: {
        "@nfts/gmf": "@latest",
        "@nfts/eslint-config": "@latest",
      },
      devDependencies: {
        "@types/jest": "~27.5.1",
        "@types/node": "~17.0.5",
        jest: "~27.4.5",
        "ts-jest": "~27.1.2",
      },
      prettier: this.getPrettierConfig(),
    };

    this.fileEmitTasks.push(() =>
      this.makeFileTask(resolve(cwd, "package.json"), JSON.stringify(pkg))
    );
  }

  private static getPrettierConfig(): Config {
    return {
      printWidth: 120,
      endOfLine: "auto",
      singleQuote: true,
      trailingComma: "none",
      arrowParens: "avoid",
    };
  }

  // 创建模板文件
  private static makeTemplateFiles(platform: Platforms, cwd: string) {
    const files: { [index: string]: string } = {
      // .eslintrc.js
      ".eslintrc.js": `
const { dirname } = require('path');
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@nfts'],
  ignorePatterns: ['*.(test|spec).*', 'node_modules', 'dist', '.yarn'],
  parserOptions: {
    tsconfigRootDir: dirname(__filename)
  }
};`,
      // .gitignore
      ".gitignore": `
# IDEs
.idea/
.vscode/

# Build/Release
dist/
build/

# Modules
node_modules/

# Lock files
yarn.lock
pnpm-lock.yaml
package-lock.json`,
      // .npmignore
      ".npmignore": `
*
!/dist/**
!/bin/**
!/schemas/**`,
      // jest.profiles.js
      "jest.config.js": `
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  passWithNoTests: true
};`,
      "tsconfig.json": `
{
  "compilerOptions": {
    "module": "Commonjs",
    "target": "ES2017",
    "declaration": true,
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "allowJs": false,
    "types": ["@types/node", "@types/jest"],
    "noImplicitAny": true,
    "skipLibCheck": true,
    "strict": true,
    "emitDeclarationOnly": ${platform !== "node" ? "false" : "true"}
  },
  "exclude": ["**/node_modules/**/*", "**/*.(test|spec).*", "**/template/**/*"]
}
`,
    };

    Object.keys(files).forEach((fileName: string) => {
      const content = files[fileName];
      this.fileEmitTasks.push(() =>
        this.makeFileTask(resolve(cwd, fileName), content)
      );
    });
  }

  // 创建写文件的 Task
  private static async makeFileTask(
    filePath: string,
    content: string
  ): Promise<void> {
    await writeFile(filePath, content, {
      encoding: "utf-8",
    });
  }
}
