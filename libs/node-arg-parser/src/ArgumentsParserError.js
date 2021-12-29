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
exports.__esModule = true;
exports.ArgumentsParserFatalError = exports.ArgumentsParserError = void 0;
var node_utils_library_1 = require("@nfts/node-utils-library");
var ArgumentsParserError = /** @class */ (function (_super) {
    __extends(ArgumentsParserError, _super);
    function ArgumentsParserError(message) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return _super.call(this, {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            kind: node_utils_library_1.ErrorKind.Error,
            message: message
        }) || this;
    }
    return ArgumentsParserError;
}(node_utils_library_1.InternalError));
exports.ArgumentsParserError = ArgumentsParserError;
var ArgumentsParserFatalError = /** @class */ (function (_super) {
    __extends(ArgumentsParserFatalError, _super);
    function ArgumentsParserFatalError(message) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return _super.call(this, {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            kind: node_utils_library_1.ErrorKind.Fatal,
            message: message
        }) || this;
    }
    return ArgumentsParserFatalError;
}(node_utils_library_1.InternalError));
exports.ArgumentsParserFatalError = ArgumentsParserFatalError;
