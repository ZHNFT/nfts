import { Hook } from '../src';
import * as console from 'console';

jest.setTimeout(10000);

describe('Hook 测试', function () {
  //  静态方法测试
  test('静态方法serialCall测试', () => {
    const fn = jest.fn();

    return expect(
      Hook.serialCall(
        [
          () =>
            new Promise<void>(resolve => {
              setTimeout(() => {
                console.log(3000);
                fn();
                resolve();
              }, 3000);
            }),
          () => {
            console.log('abcdefghijklmnopqrstuvwxyz');
          },
          () =>
            new Promise<void>(resolve => {
              setTimeout(() => {
                console.log(2000);
                fn();
                resolve();
              }, 2000);
            }),
          () =>
            new Promise<void>(resolve => {
              setTimeout(() => {
                console.log(1000);
                fn();
                resolve();
              }, 1000);
            })
        ],
        {
          a: 'a',
          b: 'b'
        }
      )
    )
      .resolves.toBe(undefined)
      .then(() => {
        expect(fn).toBeCalledTimes(3);
      });
  });
});
