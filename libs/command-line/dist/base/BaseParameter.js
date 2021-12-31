"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParameter = void 0;
var BaseParameter = /** @class */ (function () {
    function BaseParameter(opts) {
        this.longName = opts.longName;
        this.summary = opts.summary;
        this.callback = opts.callback;
    }
    return BaseParameter;
}());
exports.BaseParameter = BaseParameter;
