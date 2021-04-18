'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

var tsconfigPath = path__default['default'].resolve(process.cwd(), "tsconfig.json");
var packagePath = path__default['default'].resolve(process.cwd(), "package.json");
var pkg = JSON.parse(fs__default['default'].readFileSync(packagePath).toString());
/**
 * @method shouldUseTypescript
 *
 * @return {boolean}
 * @public
 */
function shouldUseTypescript() {
    return fs__default['default'].existsSync(tsconfigPath);
}
/**
 * @method shouldUseReact
 *
 * @return {boolean}
 * @public
 */
function shouldUseReact() {
    var dependencies = pkg.dependencies; if ( dependencies === void 0 ) dependencies = {};
    var devDependencies = pkg.devDependencies; if ( devDependencies === void 0 ) devDependencies = {};
    var peerDependencies = pkg.peerDependencies; if ( peerDependencies === void 0 ) peerDependencies = {};
    return Object.keys(Object.assign({}, dependencies,
        devDependencies,
        peerDependencies)).includes("react");
}
/**
 * @method isDevelopment
 *
 * @return {boolean}
 * @public
 */
function isDevelopment() {
    return process.env.NODE_ENV === "development";
}

var execRoot = process.cwd();
/**
 * resolve path base on basepath
 * @return {string}
 * @public
 * @param pAth
 * @param opts
 */
function resolveByBasepath(pAth, opts) {
    if (!opts)
        { opts = {}; }
    var basepath = opts.basepath;
    if (!basepath) {
        basepath = execRoot;
    }
    if (Array.isArray(pAth)) {
        return path__default['default'].join.apply(path__default['default'], [ basepath ].concat( pAth ));
    }
    return path__default['default'].join(basepath, pAth);
}

exports.isDevelopment = isDevelopment;
exports.resolveByBasepath = resolveByBasepath;
exports.shouldUseReact = shouldUseReact;
exports.shouldUseTypescript = shouldUseTypescript;
