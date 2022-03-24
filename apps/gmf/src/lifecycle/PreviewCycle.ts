import { BaseCycle, CommonPhases } from './BaseCycle';

export type PreviewPhases = CommonPhases | 'restart';

export default class PreviewCycle extends BaseCycle<PreviewPhases> {
  constructor() {
    super();
  }
}
