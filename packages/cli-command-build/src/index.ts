import { resolve } from "path";
import { IProcess } from "@initializer/cli";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import ts2 from "rollup-plugin-typescript2";
import eslint from "@rollup/plugin-eslint";

import {
  rollup,
  RollupBuild,
  InputOptions,
  OutputOptions,
  RollupOptions,
  // RollupWatcher,
  // RollupWatchOptions,
  // watch,
} from "rollup";

async function rollupBundle(option: InputOptions): Promise<RollupBuild> {
  const { input, plugins, external } = option;

  return rollup({
    input,
    plugins,
    external,
  });
}

/// esm
export function esm(pack: IProcess): OutputOptions {
  return {
    format: "esm",
    exports: "auto",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    file: resolve(pack.root, pack.json.exports.default),
  };
}

/// commonjs
export function cjs(pack: IProcess): OutputOptions {
  return {
    format: "cjs",
    exports: "auto",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    file: resolve(pack.root, pack.json.exports.node),
  };
}

export async function emit(
  bundle: RollupBuild,
  output: OutputOptions
): Promise<void> {
  await bundle.generate(output);
  await bundle.write(output); // const bundleOutput =
  // const { output: _outputs } = bundleOutput;
}

function configFor(): RollupOptions {
  const options: RollupOptions = {};

  options.plugins = [
    eslint({}),
    ts2({
      useTsconfigDeclarationDir: true,
    }) as Plugin,
    commonjs(),
    nodeResolve(),
  ];

  return options;
}

export default async function build(pm: IProcess): Promise<void> {
  const options = configFor();
  const bundle = await rollupBundle(options);
  await emit(bundle, cjs(pm));
  await emit(bundle, esm(pm));
}
