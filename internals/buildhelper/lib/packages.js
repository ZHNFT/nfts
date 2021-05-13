"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configFor = exports.emit = exports.cjs = exports.esm = exports.rollupWatch = exports.rollupBundle = exports.filterPackages = exports.Package = void 0;
/// Packages
const path_1 = require("path");
const fs_1 = require("fs");
const glob_1 = require("glob");
const plugin_node_resolve_1 = require("@rollup/plugin-node-resolve");
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const rollup_plugin_typescript2_1 = __importDefault(require("rollup-plugin-typescript2"));
const plugin_eslint_1 = __importDefault(require("@rollup/plugin-eslint"));
const utils_1 = require("./utils");
const js_yaml_1 = require("js-yaml");
const rollup_1 = require("rollup");
const cwd = process.cwd();
const packCache = new Map();
class Package {
    constructor(main) {
        this.main = main;
        const root = path_1.resolve(cwd, main), tests = path_1.resolve(root, "tests");
        this.dirs = [];
        let dirs = [...this.dirs];
        if (fs_1.existsSync(tests)) {
            dirs.push(tests);
            this.tests = fs_1.readdirSync(tests).filter((file) => /\*.ts/.test(file));
        }
        else {
            this.tests = [];
        }
        this.root = root;
        this.json = JSON.parse(fs_1.readFileSync(path_1.resolve(root, "package.json")).toString("utf-8"));
        if (this.json.main) {
            this.src = path_1.resolve(root, path_1.dirname(this.json.main));
            dirs.push(this.src);
        }
        else {
            this.src = null;
        }
        this.dirs = dirs;
    }
    get(main) {
        if (packCache.has(main)) {
            return packCache.get(main);
        }
        const pack = new Package(main);
        packCache.set(main, pack);
        return pack;
    }
}
exports.Package = Package;
/// find packages in current workspace
/// [yarn/npm] workspaces field in package.json
///     [pnpm] packages field in pnpm-workspace.yaml
function packages() {
    if (utils_1.isUsingNpm || utils_1.isUsingYarn) {
        try {
            return JSON.parse(fs_1.readFileSync(path_1.resolve(cwd, "package.json")).toString())
                .workspaces;
        }
        catch (e) {
            console.error(e.message);
            return [];
        }
    }
    if (utils_1.isUsingPnpm) {
        try {
            return js_yaml_1.load(fs_1.readFileSync(path_1.resolve(cwd, "pnpm-workspace.yaml"), {
                encoding: "utf-8",
            }), { json: true }).packages;
        }
        catch (e) {
            console.error(e.message);
            return [];
        }
    }
    return [];
}
function getPackages() {
    const workspaces = packages();
    return workspaces
        .map((workspace) => {
        return glob_1.glob.sync(workspace, {});
    })
        .flat()
        .map((workspace) => {
        return workspace;
    });
}
///
function filterPackages(scope, ignore) {
    return getPackages()
        .filter((pack) => {
        const pkg = pack.split("/")[1];
        return scope.includes(pkg) && !ignore.includes(pkg);
    })
        .map((pack) => {
        return new Package(pack);
    });
}
exports.filterPackages = filterPackages;
/// generate rollup bundle
async function rollupBundle(option) {
    const { input, plugins, external } = option;
    return rollup_1.rollup({
        input,
        plugins,
        external,
    });
}
exports.rollupBundle = rollupBundle;
// generate rollup watcher
function rollupWatch(options) {
    return rollup_1.watch(options);
}
exports.rollupWatch = rollupWatch;
/// esm
function esm(pack) {
    return {
        format: "esm",
        exports: "auto",
        file: path_1.resolve(pack.root, pack.json.exports.default),
    };
}
exports.esm = esm;
/// commonjs
function cjs(pack) {
    return {
        format: "cjs",
        exports: "auto",
        file: path_1.resolve(pack.root, pack.json.exports.node),
    };
}
exports.cjs = cjs;
/// write file to fs
async function emit(bundle, output) {
    await bundle.generate(output);
    const bundleOutput = await bundle.write(output);
    const { output: _outputs } = bundleOutput;
    console.log(`[@rays/buildhelper] write file ${_outputs[0].fileName}`);
}
exports.emit = emit;
/// generate rollup configuration
function configFor(pack, isDev) {
    const option = {};
    const { peerDependencies, dependencies, main, exports: moduleExports, } = pack.json;
    if (!main || !moduleExports) {
        console.log(`[@rays/buildhelper] ignore package ${pack.main} without \`main\` field and \`exports\` field`);
    }
    option.external = [
        ...Object.keys(dependencies || {}),
        ...Object.keys(peerDependencies || {}),
    ];
    option.plugins = [
        plugin_eslint_1.default({}),
        rollup_plugin_typescript2_1.default({
            tsconfigOverride: {
                compilerOptions: {
                    target: "es6",
                },
                include: [pack.src],
            },
        }),
        plugin_commonjs_1.default(),
        plugin_node_resolve_1.nodeResolve({
            moduleDirectories: [path_1.resolve(pack.root, "node_modules")],
        }),
        /// TODO
        /// need a api-extractor plugin
    ];
    option.input = path_1.resolve(pack.root, main);
    option.watch = isDev
        ? {
            clearScreen: true,
        }
        : false;
    return option;
}
exports.configFor = configFor;
