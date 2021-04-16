import * as fs from 'fs';
import * as path from 'path';

const tsconfigPath = path.resolve(__dirname, "tsconfig.json");
const packagePath = path.resolve(__dirname, "package.json");
const pkg = require(packagePath);
/**
 * check if project base on typescript
 * @type {[type]}
 */
function shouldUseTypescript() {
    return fs.existsSync(tsconfigPath);
}
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

export { resolveByBasepath, shouldUseReact, shouldUseTypescript };
