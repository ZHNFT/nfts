import CLI from './cli/CLI.js';

new CLI().run().then(
  () => {
    //
  },
  e => console.log(e)
);
