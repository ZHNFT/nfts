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
    "react" in (pkgJsonData.peerDependencies || {});
} catch (e) {
  throw e;
}

isUsingTypeScript = fs.existsSync(tsJson);

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {},
};
