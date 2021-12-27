import { ErrorKind, InternalError } from '../../node-utils-library/src/InternalError';

export class ArgumentsParserError extends InternalError {
  constructor(message: string) {
    super({
      kind: ErrorKind.Error,
      message: message
    });
  }
}
