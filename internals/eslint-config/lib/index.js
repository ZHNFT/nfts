"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enviroment_1 = require("@rays/enviroment");
const usingRect = enviroment_1.shouldUseReact();
const usingTs = enviroment_1.shouldUseTypescript();
const extendRuleSets = ["eslint:recommended"].concat(usingTs
    ? [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ]
    : usingRect
        ? [
            "plugin:react/recommended",
            "plugin:react-hooks/recommended",
        ]
        : []);
const config = {
    extends: extendRuleSets,
};
config.plugins = [];
if (usingTs) {
    config.parser = "@typescript-eslint/parser";
    config.plugins.push("@typescript-eslint/eslint-plugin");
}
if (usingRect) {
    config.plugins.push("react");
    config.settings = {
        react: {
            version: "detect",
        },
    };
}
exports.default = config;
