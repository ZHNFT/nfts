import { dirname } from 'path';
import { sync } from '../src/Import';

describe('导入 .ts、.js 文件模块', function () {
  it('should import .js correct', function () {
    const add = sync('./temp/moduleB.js', { cwd: dirname(__filename) }) as (
      a: number,
      b: number
    ) => number;

    expect(add(1, 2)).toEqual(3);
  });

  it('should import .ts correct', function () {
    const add = sync('./temp/moduleA.ts', { cwd: dirname(__filename) }) as {
      default: (a: number, b: number) => number;
    };

    expect(add.default(1, 2)).toEqual(3);
  });
});

describe('导入 npm 包模块', function () {
  it('导入 @babel/types 模块', function () {
    const t = sync('@babel/types', {
      cwd: dirname(dirname(__filename)),
      node_modules: 'node_modules'
    });

    expect(t).toBeTruthy();
  });
});
