import { BaseCycle } from './BaseCycle';

export type PublishPhases = 'before' | 'connect' | 'publish' | 'finished';

export default class PublishCycle extends BaseCycle<PublishPhases> {
  constructor() {
    super();
  }
}
