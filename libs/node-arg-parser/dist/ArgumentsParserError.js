import { ErrorKind, InternalError } from '@nfts/node-utils-library';
export class ArgumentsParserError extends InternalError {
    constructor(message) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        super({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            kind: ErrorKind.Error,
            message: message
        });
    }
}
export class ArgumentsParserFatalError extends InternalError {
    constructor(message) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        super({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            kind: ErrorKind.Fatal,
            message: message
        });
    }
}
