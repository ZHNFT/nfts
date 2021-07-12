import { readJsonSync } from "fs-extra";
// import { safeRequire } from "./utils";

import { Command, CommandArgs } from "./Command";
import { Plugin } from "./Plugin";
import { BuildPhase } from "./flag";
import { safeRequire } from "./utils";

type IPackage = {
  name: string;
  version: string;
  dependencies?: string[];
  devDependencies?: string[];
  peerDependencies?: string[];
  [prop: string]: unknown;
};

const execRoot = process.cwd(); /// 当前执行路径

const readJsonFile = (file: string): IPackage =>
  readJsonSync(file, { throws: false });

const rootPackageJson = readJsonFile(`${execRoot}/package.json`);

interface CoreOpts {
  command: string;
  options: CommandArgs;
}

const { dependencies, devDependencies, peerDependencies } = rootPackageJson;

const deps: Record<string, unknown> = {
  ...(dependencies ?? {}),
  ...(devDependencies ?? {}),
  ...(peerDependencies ?? {}),
};

export default async ({ command, options }: CoreOpts) => {
  /// load plugins
  const plugins = Object.keys(deps).filter((packageName) =>
    /cli-plugin-(\w)*/.test(packageName)
  );

  /// find command package
  const cmdPackage = Object.keys(deps).find((name) =>
    name.endsWith(`-${command}`)
  );

  /// exec command
  const cmd = new Command({
    name: cmdPackage as string,
    version: deps[cmdPackage as string] as string,
  });

  await cmd.pre(
    plugins.map(
      (pluginName) =>
        new Plugin({
          name: pluginName,
          version: deps[pluginName as string] as string,
          methods: safeRequire(pluginName),
        })
    ),
    options
  );
  await cmd.run(safeRequire(cmdPackage as string));
  await cmd.after();

  cmd.on(BuildPhase.finished, () => {
    console.log(`${command} build finished`);
    process.exit(0);
  });
};

export { Package } from "./Package";
export { Plugin, PluginFunc as PluginImpl } from "./Plugin";
export { CommandImpl } from "./Command";
