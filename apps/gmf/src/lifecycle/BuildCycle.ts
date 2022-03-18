import { BaseCycle, CycleInitOption } from './BaseCycle';

export type BuildPhases = 'before' | 'compile' | 'bundle' | 'emit';

export default class BuildCycle<A> extends BaseCycle<BuildPhases, A> {
  constructor(opts: CycleInitOption) {
    super(opts);
  }
}
