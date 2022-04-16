import { Parser, SubParser, FlagParameter, StringParameter } from '../src';

const rootParser = new Parser();

const buildParser = new SubParser('build', 'My test build parser')
  .addParam(
    new FlagParameter({
      name: '--flag1',
      summary: 'flag1 description'
    })
  )
  .addParam(
    new StringParameter({
      name: '--flag2',
      summary: 'flag2 description'
    })
  );

rootParser.addSubParser(buildParser);

describe('测试用例', function () {
  it('should execute without error', function () {
    rootParser.addVersion(() => {
      console.log('12.12.12');
    });

    rootParser.addHelp(() => {
      console.log('Help Help Help Help Help');
    });

    const result = rootParser.parse([
      'gmf',
      'build',
      '--flag1',
      '--flag2',
      'flag2',
      '-h',
      '-v'
    ]);

    expect(result).toStrictEqual({
      flag1: true,
      flag2: 'flag2',
      help: true,
      version: true,
      h: true,
      v: true
    });
  });
});
