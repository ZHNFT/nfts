import { EventEmitter } from "events";
import { CommandOptions } from "./index";

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
  pluginModules: Plugin[];
  constructor(name: string, commandOptions: ValuableCommandOptions) {
    super();
    this.name = name;
    this.pluginModules = Object.keys(commandOptions).map((plugin) =>
      this.loadPlugin(plugin)
    );
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
}
