/**
 * @class Plugin
 */
import { EventEmitter } from "events";
import { Package } from "@initializer/cli/Package";

export type PluginArgs = Package;

export type PluginFunc = <T>(api: Package) => Promise<T>;

type PluginFuncs = {
  [name: string]: PluginFunc;
};

export class Plugin extends EventEmitter {
  readonly version: string;
  readonly name: string;
  readonly funcs: PluginFuncs;

  constructor({
    name,
    version,
    funcs,
  }: {
    name: string;
    version: string;
    funcs: PluginFuncs;
  }) {
    super();

    this.name = name;
    this.version = version;
    this.funcs = funcs;
  }
  /**
   * Plugin的执行方法
   * */
  async run() {
    //
    console.info(`Running plugin ${this.name}@${this.version}....`);
  }
}
