import { BaseCycle, CycleInitOption } from './BaseCycle';

export type PublishPhases = 'before' | 'connect' | 'publish' | 'finished';

export default class PublishCycle<A> extends BaseCycle<PublishPhases, A> {
  constructor(opts: CycleInitOption) {
    super(opts);
  }
}
