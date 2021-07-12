/**
 * @class Plugin
 */
import { EventEmitter } from "events";
import { Package } from "./Package";
import { Command, CommandArgs } from "./Command";
import { BuildEvent, LogLevel } from "./flag";

export type PluginFunc = <T>(api: Package) => Promise<T>;

type PluginMethods = {
  [name: string]: PluginFunc;
};

export type PluginImpl = (api: Package, options?: CommandArgs) => void;

export class Plugin extends EventEmitter {
  readonly version: string;
  readonly name: string;
  readonly methods: PluginMethods;

  constructor({
    name,
    version,
    methods,
  }: {
    name: string;
    version: string;
    methods: PluginMethods;
  }) {
    super();

    this.name = name;
    this.version = version;
    this.methods = methods;
  }
  /**
   * Plugin的执行方法
   * */
  async run(api: Package, cmd: Command, options?: CommandArgs) {
    //
    console.info(`Running plugin ${this.name}@${this.version}....`);
    cmd.emit(BuildEvent.log, {
      time: new Date().toLocaleTimeString(),
      level: LogLevel.INFO,
      text: `Running plugin ${this.name}@${this.version}....`,
    });
    await this.methods.default(api);
  }
}
