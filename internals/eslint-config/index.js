const fs = require("fs");
const path = require("path");

const root = process.cwd();
const pkgJson = path.resolve(root, "package.json");
const tsJson = path.resolve(root, "tsconfig.json");

let isUsingReact, isUsingTypeScript;

try {
  fs.accessSync(pkgJson);
  const pkgJsonData = JSON.parse(fs.readFileSync(pkgJson).toString());

  isUsingReact =
    "react" in (pkgJsonData.dependencies || {}) ||
    "react" in (pkgJsonData.devDependencies || {}) ||
    "react" in (pkgJsonData.peerDependencies || {});
} catch (e) {
  throw e;
}

isUsingTypeScript = fs.existsSync(tsJson);

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

module.exports = config;
