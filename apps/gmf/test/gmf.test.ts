import { spawnSync } from 'child_process';

describe('测试命令行工具', function () {
  test('测试build指令', () => {
    spawnSync('node', ['./bin/gmf.js', 'build', '--dry']);
    spawnSync('node', ['./bin/gmf.js', 'clean', '--clean']);
  });
});
