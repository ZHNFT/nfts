import { Parser, SubParser } from '../src/new/Parser';
import { OptionTypes } from '../src/new/Option';
import { parse } from 'ts-jest';

describe('parser', function () {
  test('test-new-parser', () => {
    const parser = new Parser({
      name: 'gmf',
      description: 'gmf my my my my my my'
    });

    parser.addParser({ name: 'dev', description: 'dev' }).addParser(
      new SubParser({ name: 'prod', description: 'production' })
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
    );

    parser.parse(['dev', 'prod', '--config', '../../aaa', '--my-local=123']);

    const option = parser.options();
    console.log(option);
  });
});
