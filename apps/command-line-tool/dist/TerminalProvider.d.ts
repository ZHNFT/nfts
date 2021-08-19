export default class TerminalProvider {
    #private;
    constructor({ name }: {
        name: string;
    });
    /**
     *
     * @param msg {string | object}
     * @public
     */
    log(msg: any): void;
    /**
     *
     * @param msg {string | object}
     * @public
     */
    write(msg: string): void;
}
