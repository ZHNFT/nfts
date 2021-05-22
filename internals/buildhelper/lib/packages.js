"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const plugin_api_extractor_1 = __importDefault(require("@initializer/plugin-api-extractor"));
const utils_1 = require("./utils");
const utils_2 = require("./utils");
const js_yaml_1 = require("js-yaml");
const rollup_1 = require("rollup");
const cwd = process.cwd();
const debug = utils_1.log("packages");
const packCache = new Map([]);
class Package {
    constructor(main) {
        this.main = main;
        const root = path_1.resolve(cwd, main), tests = path_1.resolve(root, "tests"), demo = path_1.resolve(root, "demo");
        this.dirs = [];
        this.demo = {};
        const dirs = [...this.dirs];
        if (fs_1.existsSync(tests)) {
            dirs.push(tests);
            this.tests = fs_1.readdirSync(tests).filter((file) => /\*.ts/.test(file));
        }
        else {
            this.tests = [];
        }
        if (fs_1.existsSync(demo)) {
            this.demo = {
                root: demo,
            };
        }
        this.root = root;
        this.json = Package.loadPackageJson(path_1.resolve(root, "package.json"));
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
        if (packCache.has(main))
            return packCache.get(main);
        const pack = new Package(main);
        packCache.set(main, pack);
        return pack;
    }
    static loadPackageJson(packageJsonPath) {
        if (typeof packageJsonPath !== "string" || !fs_1.existsSync(packageJsonPath)) {
            throw Error(`${packageJsonPath} is not provide or not exists`);
        }
        try {
            return JSON.parse(fs_1.readFileSync(packageJsonPath).toString());
        }
        catch (e) {
            throw Error(`failed to load packageJson from ${packageJsonPath}`);
        }
    }
    static loadPnpmWorkspaceYaml(pnpmWorkspaceYaml) {
        if (typeof pnpmWorkspaceYaml !== "string" ||
            !fs_1.existsSync(pnpmWorkspaceYaml)) {
            throw Error(`${pnpmWorkspaceYaml} is not provide or not exists`);
        }
        try {
            return js_yaml_1.load(fs_1.readFileSync(path_1.resolve(cwd, "pnpm-workspace.yaml"), {
                encoding: "utf-8",
            }), { json: true });
        }
        catch (e) {
            throw Error(`failed to load pnpm-workspace.yaml from ${pnpmWorkspaceYaml}`);
        }
    }
}
exports.Package = Package;
/// find packages in current workspace
/// [yarn/npm] workspaces field in package.json
///     [pnpm] packages field in pnpm-workspace.yaml
function packages() {
    var _a, _b;
    /// multi package-manager is not allowd
    if (utils_2.hasMoreThanOnePackageLock())
        throw Error(`detect two different package-manage tool, in this repo.\n please make sure you only use one of them, (npm, yarn, pnpm)`);
    if (utils_1.isUsingPnpm) {
        return ((_a = Package.loadPackageJson(path_1.resolve(cwd, "package.json")).workspaces) !== null && _a !== void 0 ? _a : []);
    }
    if (utils_1.isUsingYarn || utils_1.isUsingNpm) {
        return ((_b = Package.loadPnpmWorkspaceYaml(path_1.resolve(cwd, "pnpm-workspace.yaml"))
            .packages) !== null && _b !== void 0 ? _b : []);
    }
    ///
    return [];
}
function getPackages() {
    const workspaces = packages();
    const syncPacks = [];
    for (let i = workspaces.length - 1; i >= 0; i--) {
        const work = workspaces[i];
        syncPacks.push(...glob_1.glob.sync(work, {}));
    }
    return syncPacks;
}
/// filter package in workspaces
function filterPackages(scope, ignore) {
    const allPackages = getPackages();
    if (allPackages.length === 0) {
        return [new Package(".")];
    }
    const packs = [];
    for (let i = allPackages.length - 1; i >= 0; i--) {
        const pack = allPackages[i];
        /// strict match
        const pkgName = pack.split("/")[1];
        if (scope.includes(pkgName) && !ignore.includes(pkgName)) {
            packs.push(new Package(pack));
        }
    }
    return packs;
}
exports.filterPackages = filterPackages;
/// generate rollup bundle
function rollupBundle(option) {
    return __awaiter(this, void 0, void 0, function* () {
        const { input, plugins, external } = option;
        return rollup_1.rollup({
            input,
            plugins,
            external,
        });
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
/// write file to local
function emit(bundle, output) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bundle.generate(output);
        const bundleOutput = yield bundle.write(output);
        const { output: _outputs } = bundleOutput;
        debug(`write file ${_outputs[0].fileName}`);
    });
}
exports.emit = emit;
/// generate rollup configuration
function configFor(pack, isDev) {
    const option = {};
    const { peerDependencies, dependencies, main, exports: moduleExports, } = pack.json;
    if (!main || !moduleExports) {
        debug(`package ${pack.main} has no \`main\` and \`exports\` fields in package.json`);
        process.exit(2);
    }
    option.external = [
        ...Object.keys(dependencies || {}),
        ...Object.keys(peerDependencies || {}),
    ];
    option.plugins = [
        plugin_eslint_1.default({}),
        rollup_plugin_typescript2_1.default({
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                compilerOptions: {
                    target: "es6",
                    declaration: true,
                    outDir: path_1.resolve(pack.root, "lib"),
                    declarationDir: path_1.resolve(pack.root, "temp"),
                    allowSyntheticDefaultImports: true,
                    jsx: "react",
                },
                include: [pack.src],
            },
        }),
        plugin_commonjs_1.default(),
        plugin_node_resolve_1.nodeResolve({
            moduleDirectories: [path_1.resolve(pack.root, "node_modules")],
        }),
        plugin_api_extractor_1.default({
            clear: true,
            cwd: pack.root,
            mainEntryPointFilePath: path_1.resolve(pack.root, "temp", path_1.basename(pack.json.main).replace(/\.tsx?$/, ".d.ts")),
        }),
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
