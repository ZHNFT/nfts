import { Command } from '../src';

describe('argparser的不完全测试', function () {
  test('正常流程测试', () => {
    const _cmd = new Command('gmf', '0.0.0');

    _cmd
      .addAction({ name: 'del', description: '删除操作' })
      .addOption({ name: '--path', description: '指定删除的路径' })
      .addOption({
        name: '--recursion',
        description: '递归删除目录下所有的文件以及文件夹'
      });

    const result = _cmd.parse([
      'del',
      'age',
      '--path=/a/b/c/d',
      '--recursion',
      '--adc',
      '996'
    ]);

    expect(result).toEqual({
      '--path': '/a/b/c/d',
      '--recursion': true,
      '--adc': '996'
    });
  });
});
