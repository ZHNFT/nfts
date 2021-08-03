/// <reference types="node" />
import readline from 'readline';
/**
 * @example
 * const terminal = new TerminalManager();
 */
export default class TerminalManager {
    readonly _rl: readline.Interface;
    constructor(rl: readline.Interface);
    get rl(): readline.Interface;
    /**
     *
     * @param msg
     * @example
     * /// 向控制台写入数据
     * TerminalManager.write('hello world');
     */
    write(msg: string): void;
}
