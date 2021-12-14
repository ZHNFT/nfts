import { Superior } from './commands/Superior';

new Superior()
	.prepare()
	.execute()
	.then(() => {
		console.log('finished');
	})
	.catch(e => {
		console.error('error', e);
	});
