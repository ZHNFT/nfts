import CLI from './cli/CLI';

new CLI().run().then(
  () => {
    // console.log('Finished');
  },
  e => console.log(e)
);
