"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParameter = void 0;
var BaseParameter = /** @class */ (function () {
    function BaseParameter(opts) {
        this.longName = opts.longName;
        this.shortName = opts.shortName;
        this.required = opts.required;
        this.callback = opts.callback;
        this.summary = opts.summary;
    }
    return BaseParameter;
}());
exports.BaseParameter = BaseParameter;
