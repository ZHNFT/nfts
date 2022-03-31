import { ImportModule } from '../src';

describe('测试ImportModule的方法', () => {
  test('懒加载模块', () => {
    const module1TSRequire = ImportModule.lazy(
      // /Users/leiwenpeng/Documents/github/ntfs/libs/node-utils-library
      './dump-files/ts/module1',
      {
        cwd: __dirname
      }
    );

    const plus = module1TSRequire();
    expect(plus.default(1, 2)).toBe(3);
  });
});
