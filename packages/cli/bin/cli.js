#! /usr/bin/env node

const minimist = require("minimist");
const { IProcess } = require("../dist/index.cjs");

const {
  _: [command, ...otherCommand],
  ...otherOptions
} = minimist(process.argv.slice(2));

const commandApply = loadModule(command);

commandApply.apply(null, [new IProcess(command, otherOptions)]);

function loadModule(command) {
  try {
    return require(`@initializer/cli-command-${command}`);
  } catch (e) {
    throw e;
  }
}
