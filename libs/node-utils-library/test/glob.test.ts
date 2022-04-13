import { Glob } from '../src/Glob';

describe('测试Glob转换', () => {
  it('should be true', () => {
    Glob.sync('src/**', { rootDir: '../src' });
    expect(
      Glob.test('src/**/*', '/user/leiwenpeng/Documents/github/nfts/app/gmf/src/index.ts')
    ).toBeTruthy();

    expect(
      Glob.test(
        'src/*',
        '/user/leiwenpeng/Documents/github/nfts/app/gmf/src/utils/index.ts'
      )
    ).toBeFalsy();

    expect(Glob.test('lei*peng', 'leiwenpeng')).toBeTruthy();
    expect(Glob.test('lei*peng', 'leiray')).toBeFalsy();
    expect(Glob.test('lei*peng', 'leiwenpengpeng')).toBeFalsy();
  });
});
