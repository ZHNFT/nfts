import { resolve } from "path";
import fs from "fs";
import { EventEmitter } from "events";
import { CommandOptions, IPackageJson } from "./index";

type Plugin = {
  name: string;
  apply: VoidFunction;
};

type ValuableCommandOptions = Pick<
  CommandOptions,
  "typescript" & "react" & "jest" & "babel"
>;

export default class IProcess extends EventEmitter {
  name: string;
  root: string;
  json: IPackageJson;
  pluginModules: Plugin[];
  constructor(name: string, commandOptions: ValuableCommandOptions) {
    super();
    this.name = name;
    this.root = process.cwd();
    this.pluginModules = Object.keys(commandOptions).map((plugin) =>
      this.loadPlugin(plugin)
    );
    this.json = this.createPackageJson(resolve(this.root, "package.json"));
  }

  start(): void {
    this.emit("process-start");
  }

  loadPlugin(pluginName: string): Plugin {
    return {
      name: pluginName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires
      apply: require(`@initializer/cli-plugin-${pluginName}`)
        .default as VoidFunction,
    };
  }

  createPackageJson(path: string): IPackageJson {
    const json: IPackageJson = {
      name: "",
      main: "src/index.ts",
      version: "0.0.0",
      exports: { default: "./dist/index.js", node: "./dist/index.cjs" },
    };
    fs.writeFileSync(path, JSON.stringify(json, null, 2));
    return json;
  }

  extendPackageJson() {
    //
  }
}
