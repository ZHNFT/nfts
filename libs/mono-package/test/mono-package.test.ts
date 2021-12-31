import { MonoPackages } from '../src/cli/MonoPackages';

describe('测试', () => {
  test('MonoPackages实例化', () => {
    const _mono = new MonoPackages();
    _mono.prepare().exec();
  });
});
