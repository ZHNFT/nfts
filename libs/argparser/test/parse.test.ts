import { Parser, SubParser, FlagParameter, StringParameter } from '../src';

const rootParser = new Parser({
  name: 'tool',
  description: 'tool tool tool tool tool'
});

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

const bundleParser = new SubParser('bundle', 'bundle you source code to single file')
  .addParam(
    new FlagParameter({
      name: '--flag3',
      summary: 'flag3 description'
    })
  )
  .addParam(
    new StringParameter({
      name: '--flag4',
      summary: 'flag4 description'
    })
  );

rootParser.addSubParser(buildParser);
rootParser.addSubParser(bundleParser);

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
      'build'
      // '--flag1',
      // '--flag2',
      // 'flag2',
      // '-h',
      // '-v'
    ]);

    expect(result).toStrictEqual({
      // flag1: true,
      // flag2: 'flag2',
      // help: true,
      // version: true,
      // h: true,
      // v: true,
      _: ['build']
    });
  });
});

describe('add help test', function () {
  const version = '1.1.1';
  rootParser.addHelp(() => {
    console.log(
      `gmf <command> [option] \n` +
        `Commands \n` +
        `build     Compile your source code with typescript compiler \n` +
        `bundle    Bundle source code into single file using webpack5 \n`
    );
  });
  rootParser.addVersion(() => `Tool \n` + `Version: ${version}`);

  test('execution failed should print help text', () => {
    const result = rootParser.parse([
      'gmf',
      'build'
      // '--flag1',
      // '--flag2',
      // 'flag2',
      // '-h',
      // '-v'
    ]);

    expect(() => {
      rootParser.parse(['gmf', 'build', '--flag3']);
    }).toThrow();
  });
});
