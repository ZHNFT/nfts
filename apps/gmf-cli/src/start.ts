import { GmfCommandLine } from './cli/GmfCommandLine';

new GmfCommandLine()
  .prepare()
  .exec()
  .then(() => {
    console.log('------------------------------------------------');
  })
  .catch(e => {
    console.log(e);
  });
