import { FileSystem } from '../src';

describe('FileSys 单元测试', () => {
  const relative_json = './test/dump-files/dump1.json';
  const absolute_json =
    '/Users/leiwenpeng/Documents/github/nfts/libs/ast-node-utils-library/test/dump-files/dump1.json';

  test('读写JSON文件', () => {
    expect(FileSystem.readJsonSync(relative_json)).toEqual({
      name: 'test-case-2',
      version: '1.0.0'
    });
  });
});
