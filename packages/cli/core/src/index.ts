import path from "path";
import minimist from "minimist";
import { readJsonSync } from "fs-extra";
import { Plugin } from "@initializer/cli/Plugin";
import { Command } from "@initializer/cli/Command";
import { safeRequire } from "@initializer/cli/utils";

const execRoot = process.cwd();

type CommandArgs = { command: string; scope?: string; ignore?: string };

/// 读取packageJson数据
const readPackageJson = () => {
  const packagePath = path.join(execRoot, "package.json");
  return readJsonSync(packagePath);
};

/// 获取命令行参数
const cliOptions = minimist<CommandArgs>(process.argv.slice(2));

/// 错误处理
if (!cliOptions.command || cliOptions.command === "help") {
  // @ts-ignore
  help();
  process.exit(1);
}

const json = readPackageJson();
const devDeps = (json.devDependencies as { [key: string]: string }) ?? {};

/// 当前使用的所有插件集合
const plugins = Object.keys(devDeps)
  .filter((key) => /^@initializer\/cli-plugin-(\w+)$/.test(key))
  .map(
    (name) =>
      new Plugin({ name, version: devDeps[name], funcs: safeRequire(name) })
  );

/// 当前使用的命令集合
// const commands = Object.keys(devDeps).filter((key) =>
//   /^@initializer\/cli-command-(\w+)$/.test(key)
// );

const cmd = new Command({
  name: cliOptions.command,
  version: cliOptions.version,
});

cmd.run(plugins);

const help = (): void => {
  console.log("Avaliable Commands");
};
