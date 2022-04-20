import { ManualHook } from '../ManualHook';

describe('manualHook测试', () => {
  const fn = jest.fn();

  const manualHook = new ManualHook<{
    name: string;
    age: number;
    address?: string;
  }>();

  const initialTaskArgs = {
    name: 'ray',
    age: 12
  };

  manualHook.add('1', (args, callback) => {
    fn();
    callback(args);
  });

  manualHook.add('2', (args, callback) => {
    return new Promise<void>(resolve => {
      resolve();
      fn();
      callback({
        ...args,
        address: 'chengdu'
      });
    });
  });

  manualHook.add('3', (args, callback) => {
    fn();
    callback(args);
  });

  manualHook.add('4', (args, callback) => {
    return new Promise<void>(resolve => {
      resolve();
      fn();
      callback({
        ...args,
        address: (args.address ?? '') + '-shuangliu'
      });
    });
  });

  test('waterfall返回正确的参数', () => {
    expect(() => manualHook.emit(initialTaskArgs)).not.toThrow();
    expect(fn).toBeCalledTimes(4);
  });
});
