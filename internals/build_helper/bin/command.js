#! /usr/bin/env node

import minimist from "minimist";
import glob from "glob";
import fs from "fs";
import jsyaml from "js-yaml";
import path from "path";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import eslint from "@rollup/plugin-eslint";

const isUsingPnpm = fs.existsSync("./pnpm-lock.yaml");
const isUsingNpm = fs.existsSync("./package-lock.json");
const isUsingYarn = fs.existsSync("./yarn.lock");

const {
  _: [command = "dev"], // 'dev'|'build'|'test'
  ignore = "",
  scope = "",
} = minimist(process.argv.slice(2), {});

const options = [];

console.log(
  `[@rays/toolkit] execute command=${command} ignore=${ignore} scope=${scope}`
);

const packs = filterPackages(scope, ignore);

if (!packs || !packs.length) {
  console.error("no package found in workspaces");
  process.exit(2);
}

/// filtered packages
const configs = [];

packs.forEach((pack) => {
  /// generate rollup configuration
  const packPath = path.resolve(pack),
    config = {};

  try {
    const pkg = fs.readFileSync(path.resolve(packPath, "package.json"));
    const { peerDependencies } = pkg;

    config.external = {
      ...peerDependencies,
    };
  } catch (e) {
    throw e;
  }

  const plugins = [
    babel({
      babelHelpers: "runtime",
    }),
    nodeResolve(),
    commonjs(),
    eslint({}),
  ];

  config.plugins = plugins;
  config.input = path.resolve(packPath, "src/index.ts");
  config.output = [
    /// CommonJS
    {
      format: "cjs",
      exports: "auto",
      file: path.resolve(packPath, "dist/index.cjs.js"),
    },
    {
      /// ES Module
      format: "esm",
      exports: "auto",
      file: path.resolve(packPath, "dist/index.esm.js"),
    },
  ];

  configs.push(config);
});

/// generate rollup bundle

Promise.resolve(
  configs.map((config) => {
    return bundle(config);
  })
)
  .then(() => {
    console.log("");
    console.log("[@rays/toolkit] Build all specified packages successfully");
  })
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });

function packages() {
  if (isUsingNpm || isUsingYarn) {
    try {
      return JSON.parse(fs.readFileSync("./package.json").toString())
        .workspaces;
    } catch (e) {
      console.error(e.message);
      return "";
    }
  }

  if (isUsingPnpm) {
    try {
      return jsyaml.load(
        fs.readFileSync("./pnpm-workspace.yaml", {
          encoding: "utf-8",
        }),
        {}
      ).packages;
    } catch (e) {
      console.error(e.message);
      return "";
    }
  }
}

function getPackages() {
  const workspaces = packages();

  return workspaces
    .map((workspace) => {
      return glob.sync(workspace, {});
    })
    .flat(2)
    .map((workspace) => {
      return workspace;
    });
}

function filterPackages(scope, ignore) {
  return getPackages().filter((pack) => {
    const pkg = pack.split("/")[1];
    return scope.includes(pkg) && !ignore.includes(pkg);
  });
}

async function bundle(config) {
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
