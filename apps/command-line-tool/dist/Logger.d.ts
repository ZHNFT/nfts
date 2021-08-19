export interface LoggerOptions {
    verbose?: boolean;
    enableTimeSummary?: boolean;
}
export declare const defaultOptions: LoggerOptions;
export default class Logger {
    #private;
    constructor(options: LoggerOptions);
    get options(): LoggerOptions;
    /**
     * @description 计算方法执行完成之后的时间
     * @param func
     *
     * @public
     */
    logCallbackTime(callback: Function): Promise<void>;
}
