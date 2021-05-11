"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const rollup_1 = require("rollup");
const plugin_node_resolve_1 = require("@rollup/plugin-node-resolve");
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const plugin_eslint_1 = __importDefault(require("@rollup/plugin-eslint"));
const packages_1 = require("./packages");
const { _: [command = "dev"], // 'dev'|'build'|'test'
ignore = "", scope = "", } = minimist_1.default(process.argv.slice(2), {});
// const options = [];
console.log(`[@rays/toolkit] execute command=${command} ignore=${ignore} scope=${scope}`);
const packs = packages_1.filterPackages(scope, ignore);
if (!packs || !packs.length) {
    console.error("no package found in workspaces");
    process.exit(2);
}
/// filtered packages
const configs = [];
packs.forEach((pack) => {
    /// generate rollup configuration
    const config = {};
    const { peerDependencies = {}, dependencies = {} } = pack.json;
    config.external = {
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
    };
    const plugins = [plugin_node_resolve_1.nodeResolve(), plugin_commonjs_1.default(), plugin_eslint_1.default()];
    config.plugins = plugins;
    config.input = pack.json.main;
    config.output = [
        /// CommonJS
        {
            format: "cjs",
            exports: "auto",
            file: pack.json.exports.node,
        },
        {
            /// ES Module
            format: "esm",
            exports: "auto",
            file: pack.json.exports.default,
        },
    ];
    configs.push(config);
});
async function runTS() { }
async function watchTS() { }
async function rollupBundle(config) {
    const packBundle = await rollup_1.rollup(config);
    return Promise.resolve([
        packBundle.generate(config),
        packBundle.write(config),
    ])
        .then(() => {
        console.log("[@ray/toolkit] Build successfully");
    })
        .catch((e) => {
        console.error(e);
    });
}
