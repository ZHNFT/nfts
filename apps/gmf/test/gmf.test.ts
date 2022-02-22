import { Gmf } from '../src/cli/Gmf';

describe('测试命令行工具', function () {
  test('测试build指令', () => {
    const gmf = new Gmf();
    gmf.execute();
  });
});
