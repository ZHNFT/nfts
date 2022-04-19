import { readDirRecursionSync } from '../src/Fs';
import { taskSync } from '../src/Measure';

describe('文件操作测试', () => {
  test('递归解析文件夹中的文件', () => {
    taskSync('读取./node_modules/typescript下的文件', () => {
      readDirRecursionSync('./node_modules');
    });
  });
});
