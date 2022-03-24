import { Lifecycle } from '../classes/Lifecycle';

export type TestPhases = 'config' | 'running' | 'failed' | 'finished';

export default class TestCycle extends Lifecycle<TestPhases> {
  constructor() {
    super();
  }
}
