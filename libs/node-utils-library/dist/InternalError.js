export var ErrorKind;
(function (ErrorKind) {
    ErrorKind["Error"] = "Error";
    ErrorKind["Fatal"] = "Fatal";
})(ErrorKind || (ErrorKind = {}));
export class InternalError extends Error {
    constructor({ message, kind }) {
        super(message);
        this._kind = kind;
        this._message = message;
    }
}
