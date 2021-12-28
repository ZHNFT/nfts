export enum ErrorKind {
  Error = 'Error',
  Fatal = 'Fatal'
}

export type TErrorKind = keyof typeof ErrorKind;

export interface IInternalErrorInfo {
  kind: TErrorKind;
  message: string;
}

export class InternalError extends Error {
  _kind: TErrorKind;
  _message: string;

  constructor({ message, kind }: IInternalErrorInfo) {
    super(message);

    this._kind = kind;
    this._message = message;
  }
}
