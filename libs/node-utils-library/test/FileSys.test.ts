import { FileSys } from '../src/FileSys';

describe('FileSys 单元测试', () => {
  const relative_json = './test/dump-files/dump1.json';
  const relative_txt = './test/dump-files/dump2.txt';
  const absolute_txt = '/Users/leiwenpeng/Documents/github/ntfs/libs/node-utils-library/test/dump-files/dump2.txt';
  const absolute_json = '/Users/leiwenpeng/Documents/github/ntfs/libs/node-utils-library/test/dump-files/dump1.json';
  test('使用相对路径', () => {
    const dumpFile = new FileSys(relative_json);
    expect(dumpFile.filePath).toEqual(absolute_json);
  });

  test('静态方法测试', () => {
    expect(FileSys.getAbsolutePath(relative_json)).toEqual(absolute_json);
  });

  test('使用绝对路径', () => {
    const dumpFile = new FileSys(absolute_json);
    expect(dumpFile.filePath).toEqual(absolute_json);
  });

  test('读写text文件', () => {
    const txtFile1 = new FileSys(relative_txt);
    const txtFile2 = new FileSys(absolute_txt);
    expect(txtFile1.readFile()).toEqual(txtFile2.readFile());
  });

  test('读写JSON文件', () => {
    const jsonFile1 = new FileSys(relative_json);
    const jsonFile2 = new FileSys(absolute_json);
    expect(jsonFile1.readFile()).toEqual(jsonFile2.readFile());
    jsonFile1.updateJsonFile({
      name: 'test-case-1'
    });
    expect(jsonFile2.readJsonFile<{ name: string }>().name).toEqual('test-case-1');

    jsonFile2.updateJsonFile({
      name: 'test-case-2',
      version: '1.0.0'
    });

    expect(jsonFile1.readJsonFile<{ name: string; version: string }>().name).toEqual('test-case-2');
    expect(jsonFile1.readJsonFile<{ name: string; version: string }>().version).toEqual('1.0.0');
  });
});
