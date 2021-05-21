"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.updateVersion = exports.revertVersion = exports.crossExecFileSync = exports.hasMoreThanOnePackageLock = exports.isUsingYarn = exports.isUsingNpm = exports.isUsingPnpm = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const child_process_1 = require("child_process");
const cwd = process.cwd();
exports.isUsingPnpm = fs_1.existsSync(path_1.resolve(cwd, "pnpm-lock.yaml"));
exports.isUsingNpm = fs_1.existsSync(path_1.resolve(cwd, "package-lock.json"));
exports.isUsingYarn = fs_1.existsSync(path_1.resolve(cwd, "yarn.lock"));
function hasMoreThanOnePackageLock() {
    return ((exports.isUsingPnpm && exports.isUsingNpm) ||
        (exports.isUsingPnpm && exports.isUsingYarn) ||
        (exports.isUsingNpm && exports.isUsingYarn));
}
exports.hasMoreThanOnePackageLock = hasMoreThanOnePackageLock;
/// make sure it's working in Wins
function crossExecFileSync(command, options = [], config = {}) {
    return child_process_1.execFileSync(command, options, Object.assign(Object.assign({ stdio: "inherit" }, config), { shell: process.platform === "win32" }));
}
exports.crossExecFileSync = crossExecFileSync;
/// revert version after release process failed
function revertVersion(pack) {
    fs_1.writeFileSync(path_1.resolve(pack.root, "package.json"), JSON.stringify(pack.json, null, 2));
}
exports.revertVersion = revertVersion;
/// update version field in package.json, before release
function updateVersion(pack, type) {
    const { json, root } = pack;
    /// make a shallow copy
    const copiedJson = Object.assign({}, json);
    let version = copiedJson.version;
    if (!version) {
        version = "0.0.0";
    }
    let [major, minor, patch] = version.split(".");
    switch (type) {
        case "major": {
            major = String(Number(major) + 1);
            minor = String(0);
            patch = String(0);
            break;
        }
        case "minor": {
            minor = String(Number(minor) + 1);
            patch = String(0);
            break;
        }
        case "patch": {
            patch = String(Number(patch) + 1);
            break;
        }
    }
    copiedJson.version = [major, minor, patch].join(".");
    fs_1.writeFileSync(path_1.resolve(root, "package.json"), JSON.stringify(copiedJson, null, 2));
    return copiedJson.version;
}
exports.updateVersion = updateVersion;
function log(module) {
    return (message) => {
        const logTime = new Date();
        console.log(`[${logTime.toLocaleString()}] [${module}] ${message}`);
    };
}
exports.log = log;
