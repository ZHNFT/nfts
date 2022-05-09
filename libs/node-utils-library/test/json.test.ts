import { readJson } from '../src/json';

interface TObj {
  name: string;
  version: string;
  main: string;
}

describe('测试 Json 读取', function () {
  it('should return correct', async function () {
    const obj = await readJson<TObj>('./test/json/data.json');
    expect(obj).toStrictEqual({
      name: 'test-import'
    });
  });
});
