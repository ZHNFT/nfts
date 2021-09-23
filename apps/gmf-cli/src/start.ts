import { GmfCommandLine } from './cli/GmfCommandLine';

new GmfCommandLine()
  .prepare()
  .exec()
  .then(() => {
    console.log('--> finished <--');
  })
  .catch(e => {
    console.log(e);
  });
