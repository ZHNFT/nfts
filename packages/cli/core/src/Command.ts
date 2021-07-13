/**
 * @class Command
 */
import { EventEmitter } from "events";
import { Package } from "./Package";
import { BuildEvent, LogLevel } from "./flag";

export interface CommandRunResult {
  [prop: string]: unknown;
}

export interface CommandArgs {
  scope?: string;
  [prop: string]: string | undefined;
}

export type CommandImpl = (
  pack: Package,
  options?: CommandArgs
) => void | Promise<void>;

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

  constructor({
    name,
    version,
    options,
  }: {
    name: string;
    version: string;
    options: CommandArgs;
  }) {
    super();

    this.name = name;
    this.version = version;
    this.options = options;

    this.recordLog();

    if (!options.scope) {
      this.commandPackage = new Package(process.cwd());
    } else {
      /// analysis scope
    }
  }

  /**
   * Run Command
   */
  async run(execute: CommandImpl) {
    /// binding command
    await execute.apply(this, [this.commandPackage as Package, this.options]);
  }

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
