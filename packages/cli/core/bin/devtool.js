#! /usr/bin/env node

import minimist from "minimist";
import runCommand from "../dist";

const { _, ...others } = minimist(process.argv.slice(2));

if (_.length < 0) {
  console.error("Usage: devtool <command> [options]");
  process.exit(1);
}

const { command } = _;
let { scope } = others;

/// 通过`,`来分割多个待构建的scope
/// "package-a,package-b,package-c,..."
/// [package-a,package-b,package-c,...]
scope = scope.split(",");

runCommand(command, { scope });
