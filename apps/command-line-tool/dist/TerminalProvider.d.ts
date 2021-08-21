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
    log: (msg: string) => void;
    /**
     *
     * @param msg {string | object}
     * @public
     */
    write: (msg: string) => void;
}
