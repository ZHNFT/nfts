import { Mono } from './cli/Mono';

new Mono()
  .prepare()
  .run()
  .then(() => {
    console.log('aaa');
  })
  .catch(e => {
    throw e;
  });
