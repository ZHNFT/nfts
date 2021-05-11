import minimist from "minimist";
import { rollup, RollupOptions } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import eslint from "@rollup/plugin-eslint";

import { filterPackages } from "./packages";

const {
  _: [command = "dev"], // 'dev'|'build'|'test'
  ignore = "",
  scope = "",
} = minimist(process.argv.slice(2), {});

// const options = [];

console.log(
  `[@rays/toolkit] execute command=${command} ignore=${ignore} scope=${scope}`
);

const packs = filterPackages(scope, ignore);

if (!packs || !packs.length) {
  console.error("no package found in workspaces");
  process.exit(2);
}

/// filtered packages
const configs: RollupOptions[] = [];

packs.forEach((pack) => {
  /// generate rollup configuration
  const config: RollupOptions = {};

  const { peerDependencies = {}, dependencies = {} } = pack.json;

  config.external = {
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies),
  };

  const plugins = [nodeResolve(), commonjs(), eslint()];

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

async function runTS() {}

async function watchTS() {}

async function rollupBundle(config: RollupOptions) {
  const packBundle = await rollup(config);

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
