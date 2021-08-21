"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argumentsParser = void 0;
const LONG_NAME_REGEXP = /^--\w+/;
const OPTION_NAME_REGEXP = /^[-]{1,2}\w/;
class ArgumentsParser {
    constructor({ name }) {
        this.name = name;
    }
    /**
     * @public
     * @param options
     */
    addOptions(options) {
        //
    }
}
exports.default = ArgumentsParser;
ArgumentsParser.parser = (args) => argumentsParser(args);
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
