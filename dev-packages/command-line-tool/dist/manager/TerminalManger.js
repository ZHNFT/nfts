/**
 *  Terminal Manager's Main Class
 **/
import readline from 'readline';
export default class TerminalManager {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    /// clear terminal line
    clearLine(lineNumber) { }
    /// clear scrren
    clearScreen() { }
    /// write line
    writeLine(msg) { }
    /// write dynamic message in one line
    writeDynamicLine(msg) { }
}
