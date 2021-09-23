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
var _NodeCommandLineParser__rawArgs, _NodeCommandLineParser__parsedArgs, _NodeCommandLineParser__optionByName;
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
        _NodeCommandLineParser__rawArgs.set(this, void 0);
        _NodeCommandLineParser__parsedArgs.set(this, void 0);
        _NodeCommandLineParser__optionByName.set(this, {});
    }
    /**
     * @public
     * @param rawArgs
     *
     * @description 解析命令行参数
     *
     */
    parser(rawArgs) {
        __classPrivateFieldSet(this, _NodeCommandLineParser__rawArgs, rawArgs, "f");
        __classPrivateFieldSet(this, _NodeCommandLineParser__parsedArgs, (0, exports.argumentsParser)(rawArgs), "f");
        return __classPrivateFieldGet(this, _NodeCommandLineParser__parsedArgs, "f");
    }
    /**
     * @description 获取原始命令行参数
     */
    get raw() {
        return __classPrivateFieldGet(this, _NodeCommandLineParser__rawArgs, "f");
    }
    /**
     * @description 获取解析后命令行参数
     */
    get cliArgs() {
        return __classPrivateFieldGet(this, _NodeCommandLineParser__parsedArgs, "f");
    }
    /**
     * @description 添加命令行参数，这里添加的使一些通用的命令行参数，所有的action都可以配置
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
     * @param options
     */
    addCommandOption(options) {
        for (const option of options) {
            __classPrivateFieldGet(this, _NodeCommandLineParser__optionByName, "f")[option.longName] = option;
        }
    }
}
exports.NodeCommandLineParser = NodeCommandLineParser;
_NodeCommandLineParser__rawArgs = new WeakMap(), _NodeCommandLineParser__parsedArgs = new WeakMap(), _NodeCommandLineParser__optionByName = new WeakMap();
