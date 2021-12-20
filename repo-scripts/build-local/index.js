const { runWithConfig } = require('./utils');

const args = process.argv.slice(2);

if (args[0] === 'build') {
  runWithConfig(args[1]);
}

throw Error(`Command Option ${args[0]} is not implement`);
