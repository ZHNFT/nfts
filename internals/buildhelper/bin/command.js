#! /usr/bin/env node

// Execute file

const minimist = require("minimist");

const {
  _: [command = "dev"], // 'dev'|'build'|'test'
  ignore = "",
  scope = "",
  type = "",
} = minimist(process.argv.slice(2));

require(`../lib/${command}`)
  .default(scope.split(","), ignore.split(","), type)
  .then(() => {
    console.log("");
  })
  .catch((e) => console.error(e));
