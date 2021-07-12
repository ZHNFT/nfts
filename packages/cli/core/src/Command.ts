/**
 * @class Command
 */
import { EventEmitter } from "events";
import { Plugin } from "./Plugin";
import { Package } from "./Package";
import { BuildEvent, LogLevel } from "./flag";

export interface CommandRunResult {
  [prop: string]: unknown;
}

export interface CommandArgs {
  [prop: string]: string;
}

export type CommandImpl = (options?: CommandArgs) => void | Promise<void>;

export class Command extends EventEmitter {
  readonly name: string;
  readonly version: string;
  readonly logs: {
    time?: string;
    text: string;
    level: keyof typeof LogLevel;
  }[] = [];
  commandPackage: Package | undefined;
  options: CommandArgs | undefined;

  constructor({ name, version }: { name: string; version: string }) {
    super();

    this.name = name;
    this.version = version;

    this.recordLog();
  }

  async pre(
    plugins: Array<Plugin>,
    options: CommandArgs = {}
  ): Promise<Package> {
    /// 实例化一个Package
    /// todo 需要调整如果指定的是多个包，是否该生成多个Package实例？
    ///      如果是monorepo，怎么生成Package实例？
    this.commandPackage = new Package(process.cwd());
    this.options = options;

    for await (let plugin of plugins) {
      await plugin.run(this.commandPackage, this, options);
    }

    return this.commandPackage;
  }

  /**
   * Run Command
   */
  async run(execute: CommandImpl): Promise<CommandRunResult> {
    /// implement run
    await execute(this.options);
    return {};
  }

  async after() {}

  recordLog() {
    this.on(
      BuildEvent.log,
      (
        log:
          | { text: string; time?: string; level?: keyof typeof LogLevel }
          | string
      ) => {
        if (typeof log === "string") {
          this.logs.push({
            time: new Date().toLocaleTimeString(),
            text: log,
            level: LogLevel.INFO,
          });
        } else {
          this.logs.push({
            time: log.time ?? new Date().toLocaleTimeString(),
            text: log.text,
            level: log.level ?? LogLevel.INFO,
          });
        }
      }
    );
  }

  // of(): Command {}
}
