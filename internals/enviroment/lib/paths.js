"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveByBasepath = void 0;
const path = require("path");
const execRoot = process.cwd();
/**
 * resolve path base on basepath
 * @param  {string | string[]}
 * @param  {ResolveByBasepathOptions}
 * @return {string}
 */
function resolveByBasepath(pAth, { basepath }) {
    if (!basepath) {
        basepath = execRoot;
    }
    if (Array.isArray(pAth)) {
        return path.join(basepath, ...pAth);
    }
    return path.join(basepath, pAth);
}
exports.resolveByBasepath = resolveByBasepath;
