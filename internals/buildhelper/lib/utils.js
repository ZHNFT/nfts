"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crossSpawnSync = exports.isUsingYarn = exports.isUsingNpm = exports.isUsingPnpm = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const cwd = process.cwd();
exports.isUsingPnpm = fs_1.existsSync(path_1.resolve(cwd, "pnpm-lock.yaml"));
exports.isUsingNpm = fs_1.existsSync(path_1.resolve(cwd, "package-lock.json"));
exports.isUsingYarn = fs_1.existsSync(path_1.resolve(cwd, "yarn.lock"));
function crossSpawnSync() { }
exports.crossSpawnSync = crossSpawnSync;
