import { resolve } from 'path';
import { SnowpackRunner } from '../src/SnowpackRunner';

describe('SwcRunner测试', () => {
  //
  const runner = new SnowpackRunner();
  runner.runAsync({ buildPath: resolve(process.cwd(), 'test/dist') });
});
