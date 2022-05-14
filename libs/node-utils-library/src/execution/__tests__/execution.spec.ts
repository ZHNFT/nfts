import { waterfall, serialize, parallel, isAsyncTask, isSyncTask } from '../';

describe('execution 方法测试用例', () => {
  test('waterfall execution', () => {
    const task1 = (count: number): number => {
      return count;
    };
    const task2 = (count: number): Promise<number> => {
      return new Promise<number>(resolve => setTimeout(() => resolve(count + 2), 2000));
    };
    const task3 = (count: number) => {
      expect(count).toBe(3);
      return count;
    };
    const task4 = (count: number): Promise<number> => {
      return new Promise<number>(resolve => setTimeout(() => resolve(count + 4), 2000));
    };
    const task5 = (count: number) => {
      expect(count).toBe(7);
      return count;
    };

    return expect(waterfall<number>([task1, task2, task3, task4, task5], 1)).resolves.not.toThrow();
  });

  test('serialize execution', () => {
    const fn = jest.fn();
    const tasks = [fn, fn, fn, fn];
    return expect(serialize(tasks))
      .resolves.not.toThrow()
      .then(() => {
        expect(fn).toBeCalledTimes(4);
      });
  });

  test('parallel execution', () => {
    const fn = jest.fn();
    const tasks = [fn, fn, fn, fn];
    return expect(parallel(tasks))
      .resolves.not.toThrow()
      .then(() => {
        expect(fn).toBeCalledTimes(4);
      });
  });

  test('execution utilities', () => {
    expect(
      isAsyncTask(() => {
        //
      })
    ).toBeFalsy();
    expect(isAsyncTask(async () => Promise.resolve(2))).toBeTruthy();
    expect(
      isAsyncTask(function* () {
        yield Promise.resolve(2);
      })
    ).toBeTruthy();

    expect(
      isSyncTask(() => {
        //
      })
    ).toBeTruthy();
    expect(isSyncTask(async () => Promise.resolve(2))).toBeFalsy();
    expect(
      isSyncTask(function* () {
        yield Promise.resolve(2);
      })
    ).toBeFalsy();
  });
});
