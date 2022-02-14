import { Mono } from './cli/Mono';

new Mono()
  .prepare()
  .run()
  .then(() => {
    //
  })
  .catch(e => {
    throw e;
  });
