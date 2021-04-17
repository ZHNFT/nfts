"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDevelopment = exports.shouldUseReact = exports.shouldUseTypescript = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const tsconfigPath = path.resolve(process.cwd(), "tsconfig.json");
const packagePath = path.resolve(process.cwd(), "package.json");
const pkg = require(packagePath);
/**
 * @method shouldUseTypescript
 *
 * @return {boolean}
 * @public
 */
function shouldUseTypescript() {
    return fs.existsSync(tsconfigPath);
}
exports.shouldUseTypescript = shouldUseTypescript;
/**
 * @method shouldUseReact
 *
 * @return {boolean}
 * @public
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
/**
 * @method isDevelopment
 *
 * @return {boolean}
 * @public
 */
function isDevelopment() {
    return process.env.NODE_ENV === "development";
}
exports.isDevelopment = isDevelopment;
