import { MonoPackagesTool } from './cli/MonoPackages';

new MonoPackagesTool()
  .prepare()
  .run()
  .then(() => {
    console.log('aaa');
  })
  .catch(e => {
    throw e;
  });
