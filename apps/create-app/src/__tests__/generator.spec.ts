import { Generator } from '../Generator';

describe('Generator test cases', () => {
  test('Generator.getCurrentUsrInfo()', () => {
    expect(() => {
      const user = Generator.getCurrentUserInfo();
      console.log(user);
    }).not.toThrow();
  });
});
