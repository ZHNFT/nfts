import { spawnSync } from 'child_process';

describe('生成模板文件', () => {
  test('测试生成模板', () => {
    expect(() => {
      spawnSync('node', ['./bin/create-app', '--ts', '--platform', 'react']);
    }).not.toThrow();
  });
});
