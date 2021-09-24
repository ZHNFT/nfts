"use strict";
/**
 * @class Logger
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    log(msg) {
        console.log(`[${new Date().toLocaleTimeString()}]`, msg);
    }
}
exports.Logger = Logger;
