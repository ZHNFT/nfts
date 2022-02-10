import { FileSystem } from '../src';

describe('FileSys 单元测试', () => {
  const relative_json = './test/dump-files/dump1.json';
  const relative_txt = './test/dump-files/dump2.txt';
  const absolute_txt =
    '/Users/leiwenpeng/Documents/github/ntfs/libs/node-utils-library/test/dump-files/dump2.txt';
  const absolute_json =
    '/Users/leiwenpeng/Documents/github/ntfs/libs/node-utils-library/test/dump-files/dump1.json';

  test('读写text文件', () => {
    expect(FileSystem.readFile(relative_txt)).toEqual(FileSystem.readFile(absolute_txt));
  });

  test('读写JSON文件', () => {
    expect(FileSystem.readFile(relative_json)).toEqual(
      FileSystem.readFile(absolute_json)
    );
  });
});
