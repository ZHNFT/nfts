import minimist from "minimist";
import { resolve } from "path";
import { RollupBuild, rollup, OutputOptions, InputOptions } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import ts from "rollup-plugin-typescript2";
import eslint from "@rollup/plugin-eslint";

import { filterPackages } from "./packages";

const {
  _: [command = "dev"], // 'dev'|'build'|'test'
  ignore = "",
  scope = "",
} = minimist(process.argv.slice(2), {});

const packs = filterPackages(scope, ignore);

if (!packs || !packs.length) {
  console.error("no package found in workspaces");
  process.exit(2);
}

console.log(
  `[@rays/toolkit] running ${command} command with ${
    packs.length === 1 ? "package" : "packages"
  } ${packs.map((pack) => pack.main).join(", ")}`
);
console.log("");

packs.forEach(async (pack) => {
  /// generate rollup configuration
  const option: InputOptions = {};

  const { peerDependencies = {}, dependencies = {}, main, exports } = pack.json;

  if (!main || !exports) {
    console.log(
      `[@rays/toolkit] ignore package ${pack.main} without \`main\` field and \`exports\` field`
    );
  }

  option.external = [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies),
  ];

  const plugins = [
    eslint(),
    ts({
      tsconfigOverride: {
        include: [pack.src], //resolve(pack.root, dirname(pack.json.main))
      },
    }),
    commonjs(),
    nodeResolve(),
  ];

  option.plugins = plugins;
  option.input = resolve(pack.root, main);

  try {
    const bundle = await rollupBundle(option);

    /// commonjs
    await emit(bundle, {
      format: "cjs",
      exports: "auto",
      file: resolve(pack.root, exports.node),
    });

    // esm
    await emit(bundle, {
      format: "esm",
      exports: "auto",
      file: resolve(pack.root, exports.default),
    });
  } catch (e) {
    console.log("->", e.message);
  }
});

// async function runTS() {}

// async function watchTS() {}

async function rollupBundle(option: InputOptions): Promise<RollupBuild> {
  const { input, plugins, external } = option;
  return rollup({
    input,
    plugins,
    external,
  });
}

async function emit(bundle: RollupBuild, output: OutputOptions) {
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
