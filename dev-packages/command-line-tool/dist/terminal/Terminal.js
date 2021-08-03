/**
 * @example
 * const terminal = new TerminalManager();
 */
export default class TerminalManager {
    constructor(rl) {
        this._rl = rl;
    }
    get rl() {
        return this._rl;
    }
    /**
     *
     * @param msg
     * @example
     * /// 向控制台写入数据
     * TerminalManager.write('hello world');
     */
    write(msg) {
        this.rl.write(msg);
    }
}
