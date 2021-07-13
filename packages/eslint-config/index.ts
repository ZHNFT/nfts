import fs from "fs";
import path from "path";
import { readJSONSync } from "fs-extra";

const root = process.cwd();
const pkgJson = path.resolve(root, "package.json");
const tsJson = path.resolve(root, "tsconfig.json");

const pkgJsonData = readJSONSync(pkgJson);

const isUsingReact: boolean =
  "react" in (pkgJsonData.dependencies || {}) ||
  "react" in (pkgJsonData.devDependencies || {}) ||
  "react" in (pkgJsonData.peerDependencies || {});

const isUsingTypeScript: boolean = fs.existsSync(tsJson);

let config = Object.create(null);

config.parser = "@babel/eslint-parser";
config.extends = ["eslint:recommended"];
config.plugins = [];
config.env = {
  browser: true,
  node: true,
  jest: true,
};
config.parserOptions = {
  ecmaVersion: 2019,
  sourceType: "module",
  ecmaFeatures: {
    jsx: isUsingReact,
  },
};

if (isUsingTypeScript) {
  config.parser = "@typescript-eslint/parser";
  config.parserOptions.project = "./tsconfig.json";
  config.plugins.push("@typescript-eslint");
  config.extends.push("plugin:@typescript-eslint/recommended");
  config.extends.push(
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  );
}

if (isUsingReact) {
  config.plugins = config.plugins.concat(["react", "react-hooks"]);
  config.settings = {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: "React",
      version: "detect",
    },
  };
}

config.overrides = [];

export default config;
