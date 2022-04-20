import { SyncHook } from '../SyncHook';

describe('SyncHook测试用例', () => {
  const fn = jest.fn();
  const synchook = new SyncHook();

  synchook.add('1', () => {
    fn();
  });

  synchook.add('2', () => {
    fn();
  });

  synchook.add('3', () => {
    fn();
  });

  synchook.add('4', () => {
    fn();
  });

  synchook.emit();
  expect(fn).toBeCalledTimes(4);

  it('should be execute 4 times', () => {
    expect(fn).toBeCalledTimes(4);
  });
});
