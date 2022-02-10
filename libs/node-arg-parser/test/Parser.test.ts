import { Parser } from '../src';

let parser: Parser | undefined;

beforeEach(() => {
  parser = Parser.getParser();
});

afterEach(() => {
  parser = undefined;
});

describe('新的Parser测试', function () {
  test('获取parser实例', () => {
    //
    expect(parser instanceof Parser).toBeTruthy();
  });

  test('设置参数', () => {
    parser.defineParam([
      { flagName: '--a', desc: 'Sample flag name --a' },
      { flagName: '-b', desc: 'Sample flag name -b' },
      { flagName: '--c', desc: 'Sample flag name --c' }
    ]);

    const res = parser.exec('a b --a -b --c 12 -d');

    expect(res.getParamValueByName('--c')).toBe('12');
    expect(res.getParamValueByName('--a')).toBeUndefined();
    expect(res.getParamValueByName('-b')).toBeUndefined();
    expect(res.getParamValueByName('-d')).toBeUndefined();
    expect(() => {
      res.strictGetParamValueByName('-e');
    }).toThrowError();

    expect(res.cmd).toBe('a');
    expect(res.subCmds).toContain('b');
    res.printParams();
  });
});
