import { MonoPackages } from './cli/MonoPackages';

new MonoPackages()
	.prepare()
	.exec()
	.then(() => {
		console.log('aaa');
	})
	.catch(e => {
		throw e;
	});
