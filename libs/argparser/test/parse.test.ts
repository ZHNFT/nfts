import { Parser, SubParser } from '../src';

describe('argparser parse test case', function () {
  const parser = new Parser({
    name: 'test',
    description: 'testtesttesttesttesttesttesttesttest'
  });

  const dev = new SubParser({ name: 'dev', description: 'devdevdevdevdevdev' });
  const list = new SubParser({ name: 'list', description: 'listlistlistlistlist' });
  const command = new SubParser({
    name: 'command',
    description: 'commandcommandcommandcommand'
  });

  parser.addSubParser(dev.addSubParser(list.addSubParser(command)));

  it('should equal', function () {
    const aOption = command.stringOption({ name: '--aOption', summary: 'aaa' });

    const bOption = command.arrayOption({
      name: '--bOption',
      callback: arg => {
        console.log('--bOption', arg);
      },
      alternatives: ['1', '2', '3'],
      summary: 'aaa'
    });

    const cOption = command.flagOption({
      name: '--cOption',
      summary: 'aaa',
      callback: arg => {
        console.log('--cOption', arg);
      }
    });

    const dOption = command.flagOption({
      name: '--dOption',
      summary: 'aaa',
      callback: arg => {
        console.log('--dOption', arg);
      }
    });

    parser.parse([
      'dev',
      'list',
      'command',
      '--aOption',
      'build',
      '--bOption=/dev/build/test',
      '--cOption',
      '--dOption'
    ]);

    const data = parser.opts();

    expect(aOption.value).toEqual('build');
    expect(bOption.value).toEqual('/dev/build/test');
    expect(cOption.value).toEqual(true);
    expect(dOption.value).toEqual(true);
    expect(data).toEqual({
      aOption: 'build',
      bOption: '/dev/build/test',
      cOption: true,
      dOption: true,
      _: ['dev', 'list', 'command']
    });
  });

  test('should be parsed with no error', () => {
    const parser = new Parser({
      name: 'test',
      description: 'testtesttesttesttesttesttesttesttest'
    });
    const dev = new SubParser({ name: 'dev', description: 'devdevdevdevdevdev' });
    parser.addSubParser(dev);

    expect(parser.parse(['dev'])).resolves.not.toThrow();
  });
});
