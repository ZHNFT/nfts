/**
 * @class Plugin
 */
import { EventEmitter } from "events";
import { Package } from "./Package";
import { CommandArgs } from "./Command";

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
  async run(api: Package, options?: CommandArgs) {
    //
    console.info(`Running plugin ${this.name}@${this.version}....`);
  }
}
