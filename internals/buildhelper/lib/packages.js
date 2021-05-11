"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPackages = exports.Package = void 0;
/// Packages
/// transpile TS with TypeScript, bundle files with Rollup
const path_1 = require("path");
const fs_1 = require("fs");
// import type { RollupOptions } from "rollup";
const glob_1 = require("glob");
const utils_1 = require("./utils");
const js_yaml_1 = require("js-yaml");
const cwd = process.cwd();
const packCache = new Map();
class Package {
    // bundleConfig: RollupOptions;
    constructor(main) {
        this.main = main;
        const root = path_1.resolve(cwd, main), src = path_1.resolve(root, "src"), tests = path_1.resolve(root, "tests;");
        let dirs = (this.dirs = [src]);
        if (fs_1.existsSync(tests)) {
            dirs.push(tests);
            // add test files to this.tests
            this.tests = fs_1.readdirSync(tests).filter((file) => /\*.ts/.test(file));
        }
        else {
            this.tests = [];
        }
        this.root = root;
        this.dirs = dirs;
        this.json = JSON.parse(fs_1.readFileSync(path_1.resolve(root, "package.json")).toString("utf-8"));
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
// function tsConfig() {}
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
