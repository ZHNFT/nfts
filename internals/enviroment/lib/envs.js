"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldUseReact = exports.shouldUseTypescript = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const tsconfigPath = path_1.default.resolve(__dirname, "tsconfig.json");
const packagePath = path_1.default.resolve(__dirname, "package.json");
const pkg = require(packagePath);
/**
 * check if project base on typescript
 * @type {[type]}
 */
function shouldUseTypescript() {
    return fs_1.default.existsSync(tsconfigPath);
}
exports.shouldUseTypescript = shouldUseTypescript;
/**
 * check if project base on react
 * @type {[type]}
 */
function shouldUseReact() {
    const { dependencies = {}, devDependencies = {}, peerDependencies = {}, } = pkg;
    return Object.keys({
        ...dependencies,
        ...devDependencies,
        ...peerDependencies,
    }).includes("react");
}
exports.shouldUseReact = shouldUseReact;
