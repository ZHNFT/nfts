"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.ErrorKind = void 0;
var ErrorKind;
(function (ErrorKind) {
    ErrorKind["Error"] = "Error";
    ErrorKind["Fatal"] = "Fatal";
})(ErrorKind = exports.ErrorKind || (exports.ErrorKind = {}));
class InternalError extends Error {
    constructor({ message, kind }) {
        super(message);
        this._kind = kind;
        this._message = message;
    }
}
exports.InternalError = InternalError;
