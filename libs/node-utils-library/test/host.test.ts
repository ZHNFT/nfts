import { chosePort } from '../src/url';

describe('HOST 方法测试', () => {
  test('端口占用测试', () => {
    return chosePort()
      .then(port => {
        expect(port).toBe(8080);
      })
      .catch(err => {
        console.error(err);
      });
  });
});
