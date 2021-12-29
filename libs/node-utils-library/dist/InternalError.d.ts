export declare enum ErrorKind {
    Error = "Error",
    Fatal = "Fatal"
}
export declare type TErrorKind = keyof typeof ErrorKind;
export interface IInternalErrorInfo {
    kind: TErrorKind;
    message: string;
}
export declare class InternalError extends Error {
    _kind: TErrorKind;
    _message: string;
    constructor({ message, kind }: IInternalErrorInfo);
}
