import { BaseCycle, CommonPhases } from './BaseCycle';

export type BuildPhases = CommonPhases;

export default class BuildCycle extends BaseCycle<CommonPhases> {
  constructor() {
    super();
  }
}
