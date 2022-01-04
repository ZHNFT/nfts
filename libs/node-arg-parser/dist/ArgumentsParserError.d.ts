import { InternalError } from '@ntfs/node-utils-library';
export declare class ArgumentsParserError extends InternalError {
    constructor(message: string);
}
export declare class ArgumentsParserFatalError extends InternalError {
    constructor(message: string);
}
