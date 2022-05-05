import { chosePort } from '../src/Host';

describe('HOST 方法测试', () => {
  test('端口占用测试', () => {
    //
    chosePort()
      .then(port => {
        expect(port).toBe(8081);
      })
      .catch(err => {
        console.error(err);
      });
  });
});
