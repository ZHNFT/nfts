"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentsParser = exports.StepType = exports.ArgumentParamKinds = void 0;
var ArgumentsParserResult_1 = require("./ArgumentsParserResult");
var ArgumentsParserError_1 = require("./ArgumentsParserError");
var ArgumentParamKinds;
(function (ArgumentParamKinds) {
    ArgumentParamKinds["String"] = "String";
    ArgumentParamKinds["Bool"] = "Bool";
    ArgumentParamKinds["Array"] = "Array";
    ArgumentParamKinds["Number"] = "Number";
    // StringArray = 'StringArray',
    // NumberArray = 'NumberArray'
})(ArgumentParamKinds = exports.ArgumentParamKinds || (exports.ArgumentParamKinds = {}));
var TokenKind;
(function (TokenKind) {
    TokenKind["CommandFlag"] = "CommandFlag";
    TokenKind["SubCommandFlag"] = "SubCommandFlag";
    TokenKind["ShortNameFlag"] = "ShortNameFlag";
    TokenKind["LongNameFlag"] = "LongNameFlag";
    TokenKind["ValueFlag"] = "ValueFlag";
    // preserved
    TokenKind["EolFlag"] = "EolFlag";
    TokenKind["SpaceFlag"] = "SpaceFlag";
})(TokenKind || (TokenKind = {}));
var StepType;
(function (StepType) {
    StepType["BeforeExec"] = "BeforeExec";
    StepType["AfterExec"] = "AfterExec";
})(StepType = exports.StepType || (exports.StepType = {}));
var ArgumentsParser = /** @class */ (function () {
    function ArgumentsParser() {
        this.result = new ArgumentsParserResult_1.ArgumentsParserResult();
        this._definedParams = new Map();
    }
    /**
     * 缓存定义的参数配置
     */
    ArgumentsParser.prototype.defineParam = function (param) {
        this._definedParams.set(param.longName, param);
        param.shortName && this._definedParams.set(param.shortName, param);
    };
    /**
     * 获取参数值
     * @param paramName
     */
    ArgumentsParser.prototype.getParamValue = function (paramName) {
        var strParamValue = this.result.getValueByParamName(paramName);
        var paramDefine = this._definedParams.get(paramName);
        if (!paramDefine) {
            console.error("parameter: ".concat(paramName, " is not defined"));
            return undefined;
        }
        var kind = paramDefine.kind;
        return ArgumentsParser._transValueByKind(kind, strParamValue);
    };
    ArgumentsParser.prototype.printParamMessage = function () {
        //
    };
    /**
     * 通过kind，将数据转换称需要的类型，默认是string
     * @param kind
     * @param str
     * @private
     */
    ArgumentsParser._transValueByKind = function (kind, str) {
        switch (kind) {
            case ArgumentParamKinds.Array:
                return str.split(',');
            case ArgumentParamKinds.Bool:
                return Boolean(str);
            case ArgumentParamKinds.Number:
                return Number(str);
            case ArgumentParamKinds.String:
                return str;
        }
    };
    /**
     * 将参数解析成Token形式
     * @return {void}
     */
    ArgumentsParser.prototype.exec = function (args) {
        var tokens = [];
        var strBuf;
        var start = 0;
        var end = 0;
        var prevToken;
        var STOP_WHILE_LOOP_INDICATOR = '\\s{1,}';
        var END_OF_WHILE_LOOP_LENGTH = args.trim().length;
        while (end <= END_OF_WHILE_LOOP_LENGTH) {
            var walkIndexStr = args.slice(end, end + 1);
            if (new RegExp(STOP_WHILE_LOOP_INDICATOR).test(walkIndexStr) ||
                end === END_OF_WHILE_LOOP_LENGTH) {
                strBuf = args.slice(start, end);
                if (/\s/.exec(strBuf)) {
                    start++;
                    end++;
                    continue;
                }
                var token = {
                    pos: { start: start, end: end },
                    buffer: strBuf,
                    kind: this._tokenKind(strBuf, { start: start, end: end }, prevToken)
                };
                tokens.push(token);
                prevToken = token;
                start = end + 1;
            }
            end++;
        }
        this._getParamsFromTokens(tokens);
        return this.result;
    };
    ArgumentsParser.prototype._getParamsFromTokens = function (tokens) {
        for (var i = 0; i < tokens.length; i++) {
            var _token = tokens[i];
            /**
             * 假设NameFlag Token的下一个Token时ValueFlag Token；
             * 如果是的话，直接设置为当前NameFlag的值写入result；
             * 如果不是，那就是一个独立的Flag，默认为undefined，设置选项可以将其设置成true；
             */
            var _nextMaybeValueToken = tokens[i + 1];
            switch (_token.kind) {
                case TokenKind.CommandFlag:
                    this.result.setCommand(_token.buffer);
                    break;
                case TokenKind.SubCommandFlag:
                    this.result.addSubCommand(_token.buffer);
                    break;
                case TokenKind.LongNameFlag:
                case TokenKind.ShortNameFlag:
                    this.result.setValueByParamName(_token.buffer, 
                    // @todo 默认填充undefined，需要配置这个字段
                    (_nextMaybeValueToken === null || _nextMaybeValueToken === void 0 ? void 0 : _nextMaybeValueToken.kind) === TokenKind.ValueFlag
                        ? _nextMaybeValueToken.buffer
                        : undefined);
                    break;
            }
        }
        this._checkParamValueAccordingToParamDefinition();
    };
    ArgumentsParser.prototype._tokenKind = function (str, pos, prevToken) {
        if (ArgumentsParser.argLongNameRegex.test(str)) {
            return TokenKind.LongNameFlag;
        }
        if (ArgumentsParser.argShortNameRegex.test(str)) {
            return TokenKind.ShortNameFlag;
        }
        if ((prevToken === null || prevToken === void 0 ? void 0 : prevToken.kind) === TokenKind.LongNameFlag ||
            (prevToken === null || prevToken === void 0 ? void 0 : prevToken.kind) === TokenKind.ShortNameFlag) {
            return TokenKind.ValueFlag;
        }
        if (!this.result.command && pos.start === 0 && pos.end !== 0) {
            return TokenKind.CommandFlag;
        }
        else {
            return TokenKind.SubCommandFlag;
        }
    };
    ArgumentsParser.prototype._checkParamValueAccordingToParamDefinition = function () {
        var paramDefinitions = this._definedParams.values();
        for (var _i = 0, _a = paramDefinitions; _i < _a.length; _i++) {
            var paramDefinition = _a[_i];
            var longName = paramDefinition.longName, shortName = paramDefinition.shortName, required = paramDefinition.required;
            if (required &&
                !this.result.getValueByParamName(longName) &&
                !this.result.getValueByParamName(shortName)) {
                throw new ArgumentsParserError_1.ArgumentsParserError("Argument ".concat(longName, "/").concat(shortName, " is required, but not find in the parse result."));
            }
            if (this.result.hasParam(longName) && this.result.hasParam(shortName)) {
                console.warn("Both long name(".concat(longName, ") and short name(").concat(shortName, ") exist, will ignore short name"));
            }
        }
    };
    /**
     * 长参数名校验正则
     * @type {RegExp}
     */
    ArgumentsParser.argLongNameRegex = /^--\w/;
    /**
     * 短参数名校验正则
     * @type {RegExp}
     */
    ArgumentsParser.argShortNameRegex = /^-\w/;
    return ArgumentsParser;
}());
exports.ArgumentsParser = ArgumentsParser;
