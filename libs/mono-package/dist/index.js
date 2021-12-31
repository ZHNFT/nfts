import { MonoPackages } from './cli/MonoPackages';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
new MonoPackages()
    .prepare()
    .exec()
    .then(() => {
    console.log('aaa');
})
    .catch(e => {
    throw e;
});
