import { BaseCycle, CycleInitOption } from './BaseCycle';

export type PreviewPhases = 'before' | 'compile' | 'bundle' | 'emit' | 'restart';

export default class PreviewCycle<A> extends BaseCycle<PreviewPhases, A> {
  constructor(opts: CycleInitOption) {
    super(opts);
  }
}
