#! /usr/bin/env node

import minimist from "minimist";
import runCommand from "../dist/index.js";

const { _, ...others } = minimist(process.argv.slice(2));

if (_.length < 0) {
  console.error("Usage: devtool <command> [options]");
  process.exit(1);
}

const [command, ...restCommands] = _;
let { scope = "", ...restArgs } = others;

/// 通过`,`来分割多个待构建的scope
scope = scope.split(",");

void runCommand({
  command,
  options: { ...restArgs, scope, subCommands: restCommands },
});
