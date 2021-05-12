"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const path_1 = require("path");
const rollup_1 = require("rollup");
const plugin_node_resolve_1 = require("@rollup/plugin-node-resolve");
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const rollup_plugin_typescript2_1 = __importDefault(require("rollup-plugin-typescript2"));
const plugin_eslint_1 = __importDefault(require("@rollup/plugin-eslint"));
const packages_1 = require("./packages");
const { _: [command = "dev"], // 'dev'|'build'|'test'
ignore = "", scope = "", } = minimist_1.default(process.argv.slice(2), {});
const packs = packages_1.filterPackages(scope, ignore);
if (!packs || !packs.length) {
    console.error("no package found in workspaces");
    process.exit(2);
}
console.log(`[@rays/toolkit] running ${command} command with ${packs.length === 1 ? "package" : "packages"} ${packs.map((pack) => pack.main).join(", ")}`);
console.log("");
packs.forEach(async (pack) => {
    /// generate rollup configuration
    const option = {};
    const { peerDependencies = {}, dependencies = {}, main, exports } = pack.json;
    if (!main || !exports) {
        console.log(`[@rays/toolkit] ignore package ${pack.main} without \`main\` field and \`exports\` field`);
    }
    option.external = [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
    ];
    const plugins = [
        plugin_eslint_1.default(),
        rollup_plugin_typescript2_1.default({
            tsconfigOverride: {
                include: [pack.src], //resolve(pack.root, dirname(pack.json.main))
            },
        }),
        plugin_commonjs_1.default(),
        plugin_node_resolve_1.nodeResolve(),
    ];
    option.plugins = plugins;
    option.input = path_1.resolve(pack.root, main);
    try {
        const bundle = await rollupBundle(option);
        /// commonjs
        await emit(bundle, {
            format: "cjs",
            exports: "auto",
            file: path_1.resolve(pack.root, exports.node),
        });
        // esm
        await emit(bundle, {
            format: "esm",
            exports: "auto",
            file: path_1.resolve(pack.root, exports.default),
        });
    }
    catch (e) {
        console.log("->", e.message);
    }
});
// async function runTS() {}
// async function watchTS() {}
async function rollupBundle(option) {
    const { input, plugins, external } = option;
    return rollup_1.rollup({
        input,
        plugins,
        external,
    });
}
async function emit(bundle, output) {
    const bundleOutput = await bundle.generate(output);
    console.log("----------------------------------------");
    console.log(bundleOutput.output);
    console.log("----------------------------------------");
    await bundle.write(output);
}
// function help(): void {
//   console.log("help [@rays/buildhelper]");
//   console.log("  toolkit");
// }
