#! /usr/bin/env node

// Execute file
const minimist = require("minimist");

const {
  // 'dev'|'build'|'test'
  _: [command = "dev"],
  ignore,
  scope,
  type,
} = minimist(process.argv.slice(2), {
  default: {
    ignore: "",
    scope: "",
    type: "patch",
  },
});

require(`../lib/${command}`)
  .default(scope.split(","), ignore.split(","), type)
  .catch((e) => console.error(e));
