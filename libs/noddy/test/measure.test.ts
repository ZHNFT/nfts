import { Measure } from '../src/measure/Measure';
import { Debug } from '../src/debug/Debug';

const measure = new Measure({ debug: Debug.getScopedLogger('Test') });

describe('方法执行时间测量', function () {
  test('task 测量', async () => {
    measure.syncTask('Task Sync', () => {
      for (let i = 0; i < 1000000000; i++) {}
    });

    console.log('');

    await measure.asyncTask('Task Async', () => {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    });
  });
});
