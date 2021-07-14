import fsExtra from "fs-extra";
import { Command, CommandArgs } from "./Command";
import { BuildPhase } from "./flag";
import { safeImport } from "./utils";

const { readJSONSync } = fsExtra;

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
  readJSONSync(file, { throws: false });

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
  /// find command package
  const cmdPackage = Object.keys(deps).find((name) =>
    name.endsWith(`-${command}`)
  );

  /// exec command
  const cmd = new Command({
    name: cmdPackage as string,
    version: deps[cmdPackage as string] as string,
    options,
  });
  const execute = await safeImport(cmdPackage as string);
  await cmd.run(execute);
  cmd.on(BuildPhase.finished, () => {
    console.log(`${command} build finished`);
    process.exit(0);
  });
};

export { Package } from "./Package";
export { Plugin, PluginFunc as PluginImpl } from "./Plugin";
export { CommandImpl } from "./Command";
