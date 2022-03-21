import { BaseCycle } from './BaseCycle';

export type BuildPhases = 'before' | 'compile' | 'bundle' | 'emit';

export default class BuildCycle extends BaseCycle<BuildPhases> {
  constructor() {
    super();
  }
}
