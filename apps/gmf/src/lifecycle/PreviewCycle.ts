import { BaseCycle } from './BaseCycle';

export type PreviewPhases = 'before' | 'compile' | 'bundle' | 'emit' | 'restart';

export default class PreviewCycle extends BaseCycle<PreviewPhases> {
  constructor() {
    super();
  }
}
