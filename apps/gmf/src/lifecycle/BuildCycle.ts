import { Lifecycle, CommonPhases } from '../classes/Lifecycle';

export type BuildPhases = CommonPhases;

export default class BuildCycle extends Lifecycle<CommonPhases> {
  constructor() {
    super();
  }
}
