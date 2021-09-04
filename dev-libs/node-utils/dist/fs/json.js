"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadJsonSync = void 0;
const fs_1 = require("fs");
const JSON5 = require("json5");
const loadJsonSync = (filePath) => {
    const jsonBuf = (0, fs_1.readFileSync)(filePath);
    return JSON5.parse(jsonBuf.toString('utf-8'));
};
exports.loadJsonSync = loadJsonSync;
//# sourceMappingURL=json.js.map