export interface ICommandLog {
    _writeBlocking: boolean;
    _readBlocking: boolean;
    format(): void;
    print(): void;
    error(): void;
    warn(): void;
}
export declare class CommandLog implements ICommandLog {
    _writeBlocking: boolean;
    _readBlocking: boolean;
    format(): void;
    print(): void;
    error(): void;
    warn(): void;
}
