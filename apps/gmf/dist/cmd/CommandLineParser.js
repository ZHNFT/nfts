"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CommandLineParser__parser, _CommandLineParser__rawArgs;
Object.defineProperty(exports, "__esModule", { value: true });
const command_line_tool_1 = require("@raydium/command-line-tool");
const ArgumentsParser_1 = require("../cmd/ArgumentsParser");
const process = require("process");
class CommandLineParser extends command_line_tool_1.CommandLineTool {
    constructor() {
        super({
            name: 'radium-cli',
            description: 'radium-cli good good good good good !!!'
        });
        _CommandLineParser__parser.set(this, void 0);
        _CommandLineParser__rawArgs.set(this, void 0);
        __classPrivateFieldSet(this, _CommandLineParser__parser, new ArgumentsParser_1.ArgumentsParser(), "f");
    }
    /**
     * @public
     * @return {CommandLineParser}
     */
    async parser() {
        __classPrivateFieldSet(this, _CommandLineParser__rawArgs, process.argv, "f");
        return this;
    }
    /**
     * @public
     * @return {CommandLineParser}
     */
    async execute() {
        return this;
    }
}
exports.default = CommandLineParser;
_CommandLineParser__parser = new WeakMap(), _CommandLineParser__rawArgs = new WeakMap();
