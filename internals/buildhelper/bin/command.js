#! /usr/bin/env node

// Execute file
const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
  default: {
    ignore: "",
    scope: "",
  },
});

const {
  // 'dev'|'build'|'test'|'preview'
  _: [command = "dev"],
  ignore,
  scope,
  ...rest
} = args;

require(`../lib/${command}`)
  .default(scope.split(","), ignore.split(","), rest)
  .catch((e) => console.error(e));
