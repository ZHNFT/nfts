import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import ts from "rollup-plugin-typescript2";
import minimist from "minimist";
import path from "path";
import fsextra from "fs-extra";
import apiExtractor from "../packages/plugin-api-extractor/dist/index.js";

const { readJsonSync } = fsextra;

const args = minimist(process.argv.slice(2));

const { module: packageName } = args;

const execRoot = process.cwd();

const packagePath = path.resolve(execRoot, "packages", packageName);

const ijson = readJsonSync(path.resolve(packagePath, "package.json"));

const nodePlugins = [
  alias(),
  commonjs({
    include: "node_modules/**",
  }),
  resolve({ extensions: [".ts", ".js,", "json", ".mjs"] }),
  json(),
  ts({
    useTsconfigDeclarationDir: true,
    tsconfig: path.resolve(packagePath, "tsconfig.json"),
  }),
];

const esmBuild = {
  input: path.resolve(packagePath, ijson.main),
  output: {
    file: path.resolve(packagePath, ijson.exports.default),
    format: "esm",
    exports: "auto",
  },
  external: Object.keys(ijson.dependencies || {}),
  plugins: [
    ...nodePlugins,
    apiExtractor({
      cwd: packagePath,
      mainEntryPointFilePath: "./temp/index.d.ts",
    }),
  ],
};

const cjsBuild = {
  input: path.resolve(packagePath, ijson.main),
  output: {
    file: path.resolve(packagePath, ijson.exports.node),
    format: "cjs",
    exports: "auto",
  },
  external: Object.keys(ijson.dependencies || {}),
  plugins: [...nodePlugins],
};

export default [esmBuild, cjsBuild];
