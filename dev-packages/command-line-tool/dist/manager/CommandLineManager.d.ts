import TerminalManager from './TerminalManger';
export default class CommandLineManager {
    private readonly _terminal;
    constructor();
    get terminal(): TerminalManager;
    parser<P>(): Promise<P>;
}
