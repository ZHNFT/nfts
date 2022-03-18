import { BaseCycle, CycleInitOption } from './BaseCycle';

export type TestPhases = 'config' | 'running' | 'failed' | 'finished';

export default class TestCycle<A> extends BaseCycle<TestPhases, A> {
  constructor(opts: CycleInitOption) {
    super(opts);
  }
}
