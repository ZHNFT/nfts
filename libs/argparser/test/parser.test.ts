import { OptionTypes, Parser } from '../src/new/Parser';

describe('parser', function () {
  test('test-new-parser', () => {
    const parser = new Parser({
      command: 'gmf',
      commandDescription: 'gmf my my my my my my '
    });

    parser
      .addParser({
        command: 'dev',
        commandDescription: 'dev'
      })
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
      });

    parser.parse(['dev', '--config', '../../aaa', '--my-local=123']);
  });
});
