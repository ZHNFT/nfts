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

export type CommandImpl = (
  plugins: Array<Plugin>,
  options?: CommandArgs
) => Promise<CommandRunResult>;

export class Command extends EventEmitter {
  readonly name: string;
  readonly version: string;
  readonly logs: {
    time?: string;
    text: string;
    level: keyof typeof LogLevel;
  }[] = [];

  constructor({ name, version }: { name: string; version: string }) {
    super();

    this.name = name;
    this.version = version;

    this.recordLog();
  }

  async pre(plugins: Array<Plugin>, options: CommandArgs = {}) {
    const pack = new Package("");

    for await (let plugin of plugins) {
      await plugin.run(pack, options);
    }
  }

  /**
   * Run Command
   */
  async run(): Promise<CommandRunResult> {
    /// implement run
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
            time: new Date().toLocaleDateString(),
            text: log,
            level: LogLevel.INFO,
          });
        } else {
          this.logs.push({
            time: log.time ?? new Date().toLocaleDateString(),
            text: log.text,
            level: log.level ?? LogLevel.INFO,
          });
        }
      }
    );
  }

  // of(): Command {}
}
