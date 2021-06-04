/// setup new project
import fs, { promises } from "fs";
import chalk from "chalk";
import path from "path";
import minimist from "minimist";
import { spawnSync } from "child_process";
import { log } from "./utils";

const debug = log("creation");

function exists(path: string): boolean {
  return fs.existsSync(path);
}

function help() {
  console.log("Usage: ");
  console.log("  toolkit create [projectName]");
}

export default async function create(
  scope: string[],
  ignore: string[]
): Promise<void> {
  if (scope?.length || ignore?.length) {
    debug(chalk.yellowBright("scope and ignore will be ignored when creation"));
  }
  const { _ } = minimist(process.argv.slice(2));

  let [, projectName] = _;

  let absoluteProjectPath = projectName;

  if (!projectName) {
    debug(`invalid project name ${projectName}`, "fatal");
    help();
  }

  if (path.isAbsolute(projectName)) {
    projectName = path.dirname(projectName);
    absoluteProjectPath = projectName;
  }

  if (exists(absoluteProjectPath)) {
    debug(
      `project path is already exists, ${chalk.yellowBright(
        absoluteProjectPath
      )}`,
      "fatal"
    );
  } else {
    await promises.mkdir(path.resolve(absoluteProjectPath));
  }

  await promises.mkdir(path.resolve(absoluteProjectPath, "src"));
  await promises.mkdir(path.resolve(absoluteProjectPath, "tests"));
  await promises.writeFile(
    path.resolve(absoluteProjectPath, "package.json"),
    JSON.stringify(
      {
        name: `@initializer/${projectName.split("/").slice(-1).toString()}`,
        version: "0.0.0",
        description: "",
        main: "src/index.ts",
        exports: {
          node: "./dist/index.cjs",
          default: "./dist/index.js",
        },
        scripts: {
          start: "toolkit preview",
          build: "toolkit build",
        },
        keywords: [projectName],
        typings: "./dist/index.d.ts",
        devDependencies: {
          "@initializer/buildhelper": "workspace:*",
          "@initializer/eslint-config": "workspace:*",
        },
        eslintConfig: {
          extends: "@initializer/eslint-config",
          ignorePatterns: ["temp/*", "dist/*"],
        },
      },
      null,
      2
    )
  );
  await promises.writeFile(
    path.resolve(absoluteProjectPath, "README.md"),
    [
      `# @initializer/${projectName.split("/").slice(-1).toString()}`,
      "---",
      `## ${projectName}`, //
    ].join("\n")
  );

  await promises.writeFile(
    path.resolve(absoluteProjectPath, "tsconfig.json"),
    JSON.stringify(
      {
        extends: "../../tsconfig.json",
        compilerOptions: {
          outDir: "./lib",
          declaration: true,
          declarationDir: "./temp",
        },
      },
      null,
      2
    )
  );

  process.chdir(absoluteProjectPath);

  spawnSync("pnpm", ["install"], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  debug("creation finished", "info");

  return Promise.resolve();
}
