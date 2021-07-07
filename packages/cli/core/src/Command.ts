/**
 * @class Command
 */
import { EventEmitter } from "events";

export interface CommandRunResult {
    [prop: string]: unknown;
}

export class Command extends EventEmitter {
    constructor() {
        super();
    }
    /**
     * Run Command
     */
    async run(): Promise<CommandRunResult> {
        // implement run
        return {};
    }
}
