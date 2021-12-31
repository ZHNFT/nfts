var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
function isValidMark(mark) {
    return /^[-]{1,2}\b/.test(mark);
}
export class Parser {
    constructor() {
        this._commandLineClassOptions = new Map();
    }
    exec(commandLineOptions) {
        const res = {};
        let token;
        const _args = commandLineOptions.slice(0);
        let _lastMeetFlag;
        while ((token = _args[0])) {
            if (!_lastMeetFlag && !res._ && !isValidMark(token)) {
                res._ = token;
            }
            if (isValidMark(token)) {
                token = token.replace(/^[-]+/, '');
                if (_lastMeetFlag) {
                    res[_lastMeetFlag] = '';
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
        // 将解析结果和Parameter进行匹配
        this._matchParameterWithParsedResult(res);
    }
    _matchParameterWithParsedResult(result) {
        const { _ } = result, trueCommandLineJsonOptions = __rest(result, ["_"]);
    }
    registerParameter(defineOpts) {
        let param;
        switch (defineOpts.kind) {
            default:
                break;
        }
        this._commandLineClassOptions.set(defineOpts.name, param);
    }
    getParameters() {
        const params = {};
        for (const iter of this._commandLineClassOptions.values()) {
        }
        return params;
    }
}
