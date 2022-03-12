import { OptionTypes, Parser, SubParser } from '../src/new/Parser';

describe('parser', function () {
  test('test-new-parser', () => {
    const parser = new Parser({
      name: 'gmf',
      description: 'gmf my my my my my my'
    });

    parser
      .addParser({ name: 'dev', description: 'dev' })
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
      .addParser(new SubParser({ name: 'prod', description: 'production' }));

    parser.parse(['dev', 'prod', '--config', '../../aaa', '--my-local=123']);
  });
});
