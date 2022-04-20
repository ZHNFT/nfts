import { AsyncHook } from '../AsyncHook';

jest.setTimeout(10000);

describe('AsyncHook 测试', function () {
  //  静态方法测试
  test('AsyncHook ', () => {
    const fn = jest.fn();
    const ahook = new AsyncHook<{ name: string; age: number }>();

    ahook.add(
      '1',
      () =>
        new Promise<void>(resolve => {
          setTimeout(() => {
            console.log(3000);
            fn();
            resolve();
          }, 3000);
        })
    );

    ahook.add(
      '2',
      () =>
        new Promise<void>(resolve => {
          setTimeout(() => {
            console.log(2000);
            fn();
            resolve();
          }, 2000);
        })
    );

    ahook.add(
      '3',
      () =>
        new Promise<void>(resolve => {
          setTimeout(() => {
            console.log(1000);
            fn();
            resolve();
          }, 1000);
        })
    );

    return expect(ahook.emit({ name: 'ray', age: 12 }))
      .resolves.toBe(undefined)
      .then(() => {
        expect(fn).toBeCalledTimes(3);
        console.log('ended');
      });
  });
});
