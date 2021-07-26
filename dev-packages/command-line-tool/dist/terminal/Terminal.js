/**
 * @example ```ts
 * const terminal = new TerminalManager();
 * ```
 */
export default class TerminalManager {
    /**
     *
     * @param msg
     * @example  ```ts
     * /// 向控制台写入数据
     * TerminalManager.write('hello world');
     * ```
     */
    write(msg) {
        this.rl.write(msg);
    }
}
