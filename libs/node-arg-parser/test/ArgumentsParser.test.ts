import { ArgumentsParser, ArgumentParamKinds, ArgumentsParserError } from '../src';

describe('CLI 命令行解析工具测试', () => {
  test('解析正确的命令行参数', () => {
    const arg1 = new ArgumentsParser();
    const arg2 = new ArgumentsParser();

    const result1 = arg1.exec('gmf dev --clean --outDir ./dir');
    const result2 = arg2.exec('gmf test --a abc dev -b --c -d --e 12 -f 12 --g 12 -h -i --j --k 你好 -l HELLO,WORLD');

    expect(result1.command).toEqual('gmf');
    expect(result1.getSubCommands()).toEqual(['dev']);
    expect(result1.getValueByParamName('--clean')).toEqual(undefined);
    expect(result1.getValueByParamName('--outDir')).toEqual('./dir');

    expect(result2.getValueByParamName('-l')).toEqual('HELLO,WORLD');
    expect(result2.getValueByParamName('--k')).toEqual('你好');
  });

  test('与定义参数与校验', () => {
    const arg = new ArgumentsParser();

    arg.defineParam({ longName: '--dir' });
    arg.defineParam({
      longName: '--outputDir',
      kind: ArgumentParamKinds.String,
      shortName: '-o',
      summary: 'this is a CLI argument output, specify where code generated.',
      required: true
    });

    try {
      arg.exec('gmf dev --clean --outputDir');
    } catch (e) {
      expect(1).toEqual(1);
    }
  });
});
