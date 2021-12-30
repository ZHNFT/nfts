"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.ErrorKind = void 0;
var ErrorKind;
(function (ErrorKind) {
    ErrorKind["Error"] = "Error";
    ErrorKind["Fatal"] = "Fatal";
})(ErrorKind = exports.ErrorKind || (exports.ErrorKind = {}));
var InternalError = /** @class */ (function (_super) {
    __extends(InternalError, _super);
    function InternalError(_a) {
        var message = _a.message, kind = _a.kind;
        var _this = _super.call(this, message) || this;
        _this._kind = kind;
        _this._message = message;
        return _this;
    }
    return InternalError;
}(Error));
exports.InternalError = InternalError;
