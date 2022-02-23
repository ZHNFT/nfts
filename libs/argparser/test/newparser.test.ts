import { Command } from '../src';

describe('测试新的parser代码', function () {
  test('简单模式', () => {
    let cmd = Command.command('gmf', "I don't give it a shit")
      .option({ name: '-h', description: 'help' })
      .argument({
        name: 'dev',
        description: '开发开发'
      })
      .option({
        name: '--server',
        description: '指定开发服务器的地址',
        required: true
      })
      .option({
        name: '--adj',
        description: '形容词',
        required: true
      })
      .callback((args: { server?: string; adj?: boolean }) => {
        console.log(args);
      });
    // 缺少参数
    expect(() => {
      cmd.parse(['gmf', 'dev', '--server', '127.0.0.1']);
    }).toThrowError('Required option [--adj] for command <dev> is missing');

    expect(() => {
      cmd.parse(['gmf', 'dev', '--server', '127.0.0.1', 'clean', '--adj']);
    }).toThrowError('Unknown argument <clean>');
  });

  //
  test('测试未设置argument的情况', () => {
    const cmd = Command.command('gmf', "I don't give it a shit")
      .option({
        name: '-h',
        description: '打印帮助信息'
      })
      .option({
        name: '--help',
        description: '打印帮助信息'
      })
      .callback<{ h?: boolean; help?: boolean }>(args => {
        expect(args.h).toBeTruthy();
        expect(args.help).toBeUndefined();
      });

    cmd.parse(['gmf', '-h']);
  });

  test('设置多层的参数', () => {
    const cb = jest.fn();

    const cmd = Command.command('gmf', "I don't give it a shit")
      .argument({
        name: 'a',
        description: 'a argument'
      })
      .callback(cb)
      .argument({
        name: 'b',
        description: 'b argument'
      })
      .callback(cb)
      .argument({
        name: 'c',
        description: 'c argument'
      })
      .callback(cb)
      .argument({
        name: 'd',
        description: 'd argument'
      })
      .callback(cb)
      .argument({
        name: 'e',
        description: 'e argument'
      })
      .callback(cb)
      .argument({
        name: 'f',
        description: 'f argument'
      })
      .callback(cb);

    cmd.parse(['gmf', 'a']);
    cmd.parse(['gmf', 'b']);
    cmd.parse(['gmf', 'c']);
    cmd.parse(['gmf', 'd']);
    cmd.parse(['gmf', 'e']);
    cmd.parse(['gmf', 'f']);

    expect(cb).toBeCalledTimes(6);
  });

  test('设置多个argument并且带不定数量的参数', () => {
    const cb = jest.fn();

    const cmd = Command.command('gmf', "I don't give it a shit")
      .argument({
        name: 'a',
        description: 'a argument'
      })
      .option({
        name: '--aaa',
        description: 'aaa'
      })
      .option({
        name: '--aaaa',
        description: 'aaaa'
      })
      .callback<{ aaa?: boolean; aaaa?: boolean }>(args => {
        expect(args).toEqual({ _: 'a', aaa: true, aaaa: true });
      })
      .argument({
        name: 'b',
        description: 'b argument'
      })
      .option({
        name: '--bbb',
        description: 'bbb'
      })
      .option({
        name: '--bbbb',
        description: 'bbbb'
      })
      .callback(args => {
        expect(args).toEqual({ _: 'b', bbb: true, bbbb: true });
      })
      .argument({
        name: 'c',
        description: 'c argument'
      })
      .option({
        name: '--ccc',
        description: 'ccc'
      })
      .option({
        name: '--cccc',
        description: 'cccc'
      })
      .callback(args => {
        expect(args).toEqual({ _: 'c', ccc: true, cccc: true });
      });

    cmd.parse(['gmf', 'a', '--aaa', '--aaaa']);
    cmd.parse(['gmf', 'b', '--bbb', '--bbbb']);
    cmd.parse(['gmf', 'c', '--ccc', '--cccc']);
  });

  test('测试help指令的输出', () => {
    const cmd = Command.command('gmf', "I don't give it a shit")
      .argument({
        name: 'aa',
        description: 'aaaaaa'
      })
      .option({ name: '--aaa', description: 'aaa', alias: '-a' })
      .option({ name: '--bbb', description: 'bbb', alias: '-b' })
      .option({ name: '--ccc', description: 'ccc', alias: '-c' })
      .option({ name: '--ddd', description: 'ddd', alias: '-d' })
      .argument({
        name: 'bb',
        description: 'bbbbbb'
      });
    cmd.parse(['gmf', 'help']);
  });
});
