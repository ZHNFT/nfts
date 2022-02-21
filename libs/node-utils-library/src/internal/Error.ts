export class ErrorProvider {
  public static fatal(msg: string): Error {
    return new Error(msg);
  }
}

export class ScopedError {
  private readonly _scope: string;

  constructor(scope: string) {
    this._scope = scope;
  }

  fatal(msg: string): Error {
    return ErrorProvider.fatal([this._scope, msg].join(': '));
  }
}
