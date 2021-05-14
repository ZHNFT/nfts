"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVersion = exports.revertVersion = exports.crossExecFileSync = exports.isUsingYarn = exports.isUsingNpm = exports.isUsingPnpm = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const child_process_1 = require("child_process");
const cwd = process.cwd();
exports.isUsingPnpm = fs_1.existsSync(path_1.resolve(cwd, "pnpm-lock.yaml"));
exports.isUsingNpm = fs_1.existsSync(path_1.resolve(cwd, "package-lock.json"));
exports.isUsingYarn = fs_1.existsSync(path_1.resolve(cwd, "yarn.lock"));
function crossExecFileSync(command, options = [], config = {}) {
    return child_process_1.execFileSync(command, options, {
        ...config,
        shell: process.platform === "win32",
    });
}
exports.crossExecFileSync = crossExecFileSync;
/// revert package version
function revertVersion(pack) {
    fs_1.writeFileSync(path_1.resolve(pack.root, "package.json"), JSON.stringify(pack.json, null, 2));
}
exports.revertVersion = revertVersion;
function updateVersion(pack, type) {
    const { json, root } = pack;
    /// shallow copy， easy to revert version
    const copiedJson = Object.assign({}, json);
    const version = copiedJson.version;
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
}
exports.updateVersion = updateVersion;
