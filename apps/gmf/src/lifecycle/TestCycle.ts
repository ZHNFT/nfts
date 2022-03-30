import { Lifecycle, CommonPhases } from '../classes/Lifecycle';

export type TestPhases = CommonPhases;

export default class TestCycle extends Lifecycle<TestPhases> {
  constructor() {
    super();
  }
}
