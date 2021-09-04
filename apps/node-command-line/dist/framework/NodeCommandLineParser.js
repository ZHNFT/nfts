"use strict";
/**
 * @class NodeCommandLineParser
 *
 * 在这里基础类中，只有解析命令行参数的功能。
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NodeCommandLineParser_rawArgs, _NodeCommandLineParser_parsedArgs;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeCommandLineParser = exports.argumentsParser = void 0;
const argumentsParser = (args) => {
    const obj = Object.create(null);
    let option;
    let prevFlagName;
    obj._ = [];
    while ((option = args.shift())) {
        if (/^[-]{1,2}\w/.test(option)) {
            if (prevFlagName) {
                obj[prevFlagName] = true;
            }
            prevFlagName = option.startsWith('--')
                ? option.replace('--', '')
                : option.replace('-', '');
        }
        else {
            if (prevFlagName) {
                obj[prevFlagName] = option;
            }
            else {
                obj._.push(option);
            }
            prevFlagName = '';
        }
    }
    return obj;
};
exports.argumentsParser = argumentsParser;
class NodeCommandLineParser {
    constructor() {
        _NodeCommandLineParser_rawArgs.set(this, void 0);
        _NodeCommandLineParser_parsedArgs.set(this, void 0);
    }
    parser(rawArgs) {
        __classPrivateFieldSet(this, _NodeCommandLineParser_rawArgs, rawArgs, "f");
        __classPrivateFieldSet(this, _NodeCommandLineParser_parsedArgs, exports.argumentsParser(rawArgs), "f");
        return __classPrivateFieldGet(this, _NodeCommandLineParser_parsedArgs, "f");
    }
    get raw() {
        return __classPrivateFieldGet(this, _NodeCommandLineParser_rawArgs, "f");
    }
    /**
     * @description 添加命令行参数，这里添加的使一些通用的命令行参数，所有的action都可以配置
     * @param optionName
     *
     * @example
     *
     * nclp.addCommandOption([
     *  {
     *    longName: "--clean",
     *    shortName: "-c",
     *    description: "xxxx"
     *  },
     *  {
     *    longName: "--verbose",
     *    shortName: "-v",
     *    description: "xxxx"
     *  },
     *  ......
     * ])
     *
     */
    addCommandOption(options) {
        //
    }
}
exports.NodeCommandLineParser = NodeCommandLineParser;
_NodeCommandLineParser_rawArgs = new WeakMap(), _NodeCommandLineParser_parsedArgs = new WeakMap();
