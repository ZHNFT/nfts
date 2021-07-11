import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import ts from "rollup-plugin-typescript2";
import minimist from "minimist";
import path from "path";
import fsextra from "fs-extra";

const { readJsonSync } = fsextra;

const args = minimist(process.argv.slice(2));

const [packageName] = args._;

const execRoot = process.cwd();

const packagePath = path.resolve(execRoot, "packages", packageName);

const ijson = readJsonSync(path.resolve(packagePath, "package.json"));

const nodePlugins = [
	alias(),
	commonjs({
		include: "node_modules/**",
	}),
	resolve({
		rootDir: packagePath,
		extensions: [".ts", ".js,", "json", ".mjs"],
	}),
	json(),
	ts({
		useTsconfigDeclarationDir: true,
		tsconfigOverride: {
			skipLibCheck: true,
		},
	}),
];

const esmBuild = {
	// input: path.resolve(packagePath),
	output: {
		file: path.resolve(packagePath, "dist/index.js"),
		format: "esm",
		exports: "auto",
	},
	// plugins: [...nodePlugins],
};

console.log(esmBuild);

export default [esmBuild];
