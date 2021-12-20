const { runWithConfig } = require('./utils');

const args = process.argv.slice(2);

switch (args[0]) {
  case 'build':
    runWithConfig(args[1]);
    break;

  default:
    throw Error(`Command Option ${args[0]} is not implement`);
}
