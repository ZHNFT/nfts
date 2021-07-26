/// <reference types="node" />
import readline from 'readline';
/**
 * @example ```ts
 * const terminal = new TerminalManager();
 * ```
 */
export default class TerminalManager {
    readonly rl: readline.Interface;
    /**
     *
     * @param msg
     * @example  ```ts
     * /// 向控制台写入数据
     * TerminalManager.write('hello world');
     * ```
     */
    write(msg: string): void;
}
