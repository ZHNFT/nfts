"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var isValidMark = function (mark) { return /^[-]{1,2}\b/.test(mark); };
var InitialOptions = { defaultToTrue: true };
function cli_args(args, options) {
    var res = {};
    options = __assign(__assign({}, InitialOptions), options);
    var token;
    var _args = args.slice(0);
    var _lastMeetFlag;
    while ((token = _args[0])) {
        if (!_lastMeetFlag && !res._ && !isValidMark(token)) {
            res._ = token;
        }
        if (isValidMark(token)) {
            token = token.replace(/^[\-]+/, '');
            if (_lastMeetFlag) {
                res[_lastMeetFlag] = options.defaultToTrue ? true : '';
            }
            _lastMeetFlag = token;
        }
        else {
            if (_lastMeetFlag) {
                res[_lastMeetFlag] = token;
                _lastMeetFlag = undefined;
            }
        }
        _args.splice(0, 1);
    }
    return res;
}
exports.default = cli_args;
