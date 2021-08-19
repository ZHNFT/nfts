"use strict";
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
var _CommandLineTool__name, _CommandLineTool__description, _CommandLineTool__logger, _CommandLineTool__terminal, _CommandLineTool__bin, _CommandLineTool__executedFile, _CommandLineTool__commandLineOptions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.argumentsParser = void 0;
const Logger_1 = require("./Logger");
const TerminalProvider_1 = require("./TerminalProvider");
const LONG_NAME_REGEXP = /^--\w+/;
const OPTION_NAME_REGEXP = /^[-]{1,2}\w/;
class CommandLineTool {
    constructor({ name, description }) {
        _CommandLineTool__name.set(this, void 0);
        _CommandLineTool__description.set(this, void 0);
        _CommandLineTool__logger.set(this, void 0);
        _CommandLineTool__terminal.set(this, void 0);
        _CommandLineTool__bin.set(this, void 0);
        _CommandLineTool__executedFile.set(this, void 0);
        _CommandLineTool__commandLineOptions.set(this, void 0);
        __classPrivateFieldSet(this, _CommandLineTool__name, name, "f");
        __classPrivateFieldSet(this, _CommandLineTool__description, description, "f");
        __classPrivateFieldSet(this, _CommandLineTool__logger, new Logger_1.default({
            enableTimeSummary: true,
            verbose: true
        }), "f");
        __classPrivateFieldSet(this, _CommandLineTool__terminal, new TerminalProvider_1.default({ name }), "f");
    }
    get commandLineOptions() {
        return __classPrivateFieldGet(this, _CommandLineTool__commandLineOptions, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _CommandLineTool__name, "f");
    }
    get description() {
        return __classPrivateFieldGet(this, _CommandLineTool__description, "f");
    }
    parser(argv) {
        const args = argv ?? process.argv;
        const [bin, executedFile, ...rawArgs] = args;
        __classPrivateFieldSet(this, _CommandLineTool__bin, bin, "f");
        __classPrivateFieldSet(this, _CommandLineTool__executedFile, executedFile, "f");
        __classPrivateFieldSet(this, _CommandLineTool__commandLineOptions, argumentsParser(rawArgs), "f");
        return this;
    }
}
exports.default = CommandLineTool;
_CommandLineTool__name = new WeakMap(), _CommandLineTool__description = new WeakMap(), _CommandLineTool__logger = new WeakMap(), _CommandLineTool__terminal = new WeakMap(), _CommandLineTool__bin = new WeakMap(), _CommandLineTool__executedFile = new WeakMap(), _CommandLineTool__commandLineOptions = new WeakMap();
/**
 *
 * @param args
 *
 * @example
 *
 * const result = argumentsParser(['command', '--a', 'a', '-b', 'b', '--true', '--alsoTrue'])
 *
 * result // {
 *   _: ['command'],
 *   'a': 'a',
 *   'b': 'b',
 *   'true': true,
 *   'alsoTrue': true,
 *  }
 *
 */
function argumentsParser(args) {
    const obj = Object.create(null);
    let option;
    let prevFlagName;
    obj._ = [];
    while ((option = args.shift())) {
        if (OPTION_NAME_REGEXP.test(option)) {
            if (prevFlagName) {
                obj[prevFlagName] = true;
            }
            prevFlagName = LONG_NAME_REGEXP.test(option)
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
}
exports.argumentsParser = argumentsParser;
