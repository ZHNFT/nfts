/// <reference types="node" />
/**
 *  Terminal Manager's Main Class
 **/
import readline from 'readline';
export default class TerminalManager {
    readonly rl: readline.Interface;
    constructor();
    clearLine(lineNumber: number): void;
    clearScreen(): void;
    writeLine(msg: string): void;
    writeDynamicLine(msg: string): void;
}
