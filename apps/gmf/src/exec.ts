import { CLI } from './cli';

new CLI().run().then(
  () => {
    console.log('Finished');
  },
  e => console.log(e)
);
