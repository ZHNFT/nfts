/**
 * @class Command
 */
import { EventEmitter } from "events";
import { Plugin } from "@initializer/cli/Plugin";

export interface CommandRunResult {
  [prop: string]: unknown;
}

export class Command extends EventEmitter {
  readonly name: string;
  readonly version: string;

  constructor({ name, version }: { name: string; version: string }) {
    super();

    this.name = name;
    this.version = version;
  }
  /**
   * Run Command
   */
  async run(plugins: Array<Plugin>): Promise<CommandRunResult> {
    // implement run
    return {};
  }

  // of(): Command {}
}
