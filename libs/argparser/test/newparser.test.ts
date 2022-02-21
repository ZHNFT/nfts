import { Command } from '../src/new/Command';

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
      .callback((args: { '--server'?: string; '--adj'?: boolean }) => {
        console.log(args);
      });

    // 缺少参数
    expect(() => {
      cmd.parse(['gmf', 'dev', '--server', '127.0.0.1']);
    }).toThrow();

    // 完整参数
    cmd.parse(['gmf', 'dev', '--server', '127.0.0.1', '--adj']);
  });
});
