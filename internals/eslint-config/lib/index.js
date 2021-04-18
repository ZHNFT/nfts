'use strict';

var environment = require('@rays/environment');

var usingRect = environment.shouldUseReact();
var usingTs = environment.shouldUseTypescript();
var extendRuleSets = ["eslint:recommended"].concat(usingTs
    ? [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking" ]
    : usingRect
        ? ["plugin:react/recommended", "plugin:react-hooks/recommended"]
        : []);
var config = {
    extends: extendRuleSets,
};
config.plugins = [];
config.parserOptions = {};
if (usingTs) {
    config.parser = "@typescript-eslint/parser";
    config.parserOptions.project = environment.resolveByBasepath("tsconfig.json", {});
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

module.exports = config;
