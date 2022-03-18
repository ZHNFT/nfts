import { Parser, SubParser } from '../src/new/Parser';
import { OptionTypes } from '../src/new/Option';

/*
.addOption({
          name: '--config',
          usage: 'Find config files',
          required: true,
          type: OptionTypes.Flag
        })
        .addOption({
          name: '--my-local',
          usage: 'test test test test',
          required: false,
          type: OptionTypes.Flag
        })
 */

describe('parser', function () {
	test('test-new-parser', () => {
		const parser = new Parser({
			name: 'gmf',
			description: 'gmf my my my my my my'
		});

		const dev = new SubParser({
			name: 'dev',
			description: 'Run development command'
		});

		const build = new SubParser({
			name: 'build',
			description: 'Run build command'
		});

		build.addOption({
			type: 'Flag',
			name: '--clean',
			usage: 'clean up your uild dist'
		});

		build.addOption({
			type: 'String',
			name: '--config',
			alias: '-c',
			usage: 'Extra config files'
		});

		build.addOption({
			type: 'Flag',
			name: '--verbose',
			usage: 'Print more message in terminal'
		});

		parser.addParser(dev);
		parser.addParser(build);

		parser.parse(['build', '--config', '../../aaa', '--my-local=123', '--clean', '--verbose']);

		const option = parser.options();
		console.log(option);
	});
});
