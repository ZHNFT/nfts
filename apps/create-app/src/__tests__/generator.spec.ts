import { Generator } from '../Generator';

describe('Generator test cases', () => {
  test('Generator.getCurrentUsrInfo()', () => {
    expect(() => Generator.getCurrentUserInfo()).not.toThrow();
  });
});
