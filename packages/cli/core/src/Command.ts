/**
 * @class Command
 */
import { EventEmitter } from "events";
import { Package } from "./Package";
import { ILogLevel, LogLevel } from "./flag";

export interface CommandRunResult {
  [prop: string]: unknown;
}

export interface CommandArgs {
  scope?: string;
  [prop: string]: string | undefined;
}

export type CommandImpl = (cmd: Command) => void | Promise<void>;

export class Command extends EventEmitter {
  readonly name: string;
  readonly version: string;
  readonly logs: {
    time: string;
    message: string;
    level: keyof typeof LogLevel;
  }[] = [];
  readonly commandPackage: Package | undefined;
  readonly options: CommandArgs | undefined;

  constructor({
    name,
    version,
    options,
  }: {
    readonly name: string;
    readonly version: string;
    readonly options: CommandArgs;
  }) {
    super();

    this.name = name;
    this.version = version;
    this.options = options;

    this.commandPackage = new Package(process.cwd());
  }

  async run(execute: CommandImpl) {
    await this.loadPlugins();
    await execute.apply(null, [this]);
  }

  async loadPlugins() {
    // const { json } = this.commandPackage as Package;
    // const { dependencies, devDependencies, peerDependencies } = json;
    //
    // const plugins = {
    //
    // };
  }

  log(message: string, level: ILogLevel) {
    this.logs.push({
      time: new Date().toLocaleTimeString(),
      message,
      level,
    });
    console.log(message);
  }
}
