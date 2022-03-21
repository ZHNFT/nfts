import { BaseCycle } from './BaseCycle';

export type TestPhases = 'config' | 'running' | 'failed' | 'finished';

export default class TestCycle extends BaseCycle<TestPhases> {
  constructor() {
    super();
  }
}
