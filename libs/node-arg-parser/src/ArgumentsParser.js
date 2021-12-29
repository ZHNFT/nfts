"use strict";
exports.__esModule = true;
exports.ArgumentsParser = exports.StepType = exports.ArgumentParamKind = void 0;
var ArgumentsParserResult_1 = require("./ArgumentsParserResult");
var ArgumentParamKind;
(function (ArgumentParamKind) {
    ArgumentParamKind["String"] = "String";
    ArgumentParamKind["Bool"] = "Bool";
    ArgumentParamKind["Array"] = "Array";
    ArgumentParamKind["Number"] = "Number";
})(ArgumentParamKind = exports.ArgumentParamKind || (exports.ArgumentParamKind = {}));
var TokenKind;
(function (TokenKind) {
    TokenKind["CommandFlag"] = "CommandFlag";
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
        this._executed = false;
        this._result = new ArgumentsParserResult_1.ArgumentsParserResult();
    }
    /**
     * 缓存定义的参数配置
     */
    ArgumentsParser.prototype.defineParam = function (param) {
        this._processVerify(StepType.BeforeExec);
        this._definedParams.set(param.name, param);
    };
    /**
     * 获取参数值
     * @param paramName
     */
    ArgumentsParser.prototype.getParamValue = function (paramName) {
        this._processVerify(StepType.AfterExec);
        var strParamValue = this._result.getParamValueByName(paramName);
        var paramDefine = this._definedParams.get(paramName);
        if (!paramDefine) {
            console.error("parameter: ".concat(paramName, " is not defined"));
            return undefined;
        }
        var kind = paramDefine.kind;
        return ArgumentsParser._transValueByKind(kind, strParamValue);
    };
    /**
     * 获取command
     */
    ArgumentsParser.prototype.getCommand = function () {
        this._processVerify(StepType.AfterExec);
        return this._result.command;
    };
    /**
     * 获取子命令集合
     */
    ArgumentsParser.prototype.getSubCommands = function () {
        this._processVerify(StepType.AfterExec);
        return Array.from(this._result.subCommands);
    };
    /**
     * 通过kind，将数据转换称需要的类型，默认是string
     * @param kind
     * @param str
     * @private
     */
    ArgumentsParser._transValueByKind = function (kind, str) {
        switch (kind) {
            case ArgumentParamKind.Array:
                return str.split(',');
            case ArgumentParamKind.Bool:
                return Boolean(str);
            case ArgumentParamKind.Number:
                return Number(str);
            case ArgumentParamKind.String:
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
        while (end < END_OF_WHILE_LOOP_LENGTH) {
            var walkIndexStr = args.slice(end, end + 1);
            if (new RegExp(STOP_WHILE_LOOP_INDICATOR).test(walkIndexStr)) {
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
        this._executed = true;
        return this._result;
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
                    i === 0 && this._result.setCommand(_token.buffer);
                    i !== 0 && this._result.addSubCommands(_token.buffer);
                    break;
                case TokenKind.LongNameFlag:
                case TokenKind.ShortNameFlag:
                    this._result.setParamValueByName(_token.buffer, _nextMaybeValueToken.kind === TokenKind.ValueFlag ? _nextMaybeValueToken.buffer : undefined);
                    break;
            }
        }
    };
    ArgumentsParser.prototype._tokenKind = function (str, pos, prevToken) {
        if (ArgumentsParser.argLongNameRegex.test(str)) {
            return TokenKind.LongNameFlag;
        }
        if (ArgumentsParser.argShortNameRegex.test(str)) {
            return TokenKind.ShortNameFlag;
        }
        if (!this._result.command && pos.start === 0 && pos.end !== 0) {
            return TokenKind.CommandFlag;
        }
        if (prevToken.kind === TokenKind.LongNameFlag || prevToken.kind === TokenKind.ShortNameFlag) {
            return TokenKind.ValueFlag;
        }
        return null;
    };
    ArgumentsParser.prototype._processVerify = function (ensureStep) {
        if ((ensureStep === StepType.BeforeExec && this._executed) ||
            (ensureStep === StepType.AfterExec && !this._executed)) {
            throw Error("Wrong Execution Timing:");
        }
    };
    /**
     * 长参数名校验正则
     * @type {RegExp}
     */
    ArgumentsParser.argLongNameRegex = /^\w/;
    /**
     * 短参数名校验正则
     * @type {RegExp}
     */
    ArgumentsParser.argShortNameRegex = /^\w/;
    return ArgumentsParser;
}());
exports.ArgumentsParser = ArgumentsParser;
