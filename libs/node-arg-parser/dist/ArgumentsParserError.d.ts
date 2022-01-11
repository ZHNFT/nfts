import { InternalError } from '@nfts/node-utils-library';
export declare class ArgumentsParserError extends InternalError {
    constructor(message: string);
}
export declare class ArgumentsParserFatalError extends InternalError {
    constructor(message: string);
}
