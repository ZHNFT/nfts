"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const plugin = (api, options) => {
    api.hooks.build.tap('plugin-ts', () => {
        console.log('Starting typescript compiler');
        (0, child_process_1.spawnSync)('tsc', ['--showConfig', '--listFilesOnly'], {
            stdio: 'inherit'
        });
    });
};
exports.default = plugin;
