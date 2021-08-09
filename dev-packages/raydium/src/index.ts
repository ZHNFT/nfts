import { CommandLineParser } from 'src/cmd';

new CommandLineParser()
	.parser()
	.execute()
	.then(() => {
		console.log('execute finished');
	});
