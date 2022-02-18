import { Command } from '../src';

describe('argparser的不完全测试', function () {
  test('正常流程测试', () => {
    const _cmd = new Command('gmf', '一个一个', '0.0.0');

    _cmd
      .addActionByConfig({ name: 'del', description: '删除操作' })
      .addOption({ name: '--path', description: '指定删除的路径' })
      .addOption({
        name: '--recursion',
        description: '递归删除目录下所有的文件以及文件夹'
      })
      .addCallback((args: { path: string }) => {
        expect(args['path']).toBe('/a/b/c/d');
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
      path: '/a/b/c/d',
      recursion: true,
      adc: '996'
    });

    _cmd
      .addActionByConfig({ name: 'install', description: '安装操作' })
      .addOption({ name: '--force', description: '强制重新安装' })
      .addOption({ name: '--verbose', description: '输出所有终端信息' })
      .addCallback((args: { force: boolean; verbose: boolean }) => {
        expect(args['force']).toBe(true);
        expect(args['verbose']).toBe(true);
      });

    const result1 = _cmd.parse(['install', 'age', '--force', '--verbose']);

    expect(result1).toEqual({
      force: true,
      verbose: true
    });
  });
});
