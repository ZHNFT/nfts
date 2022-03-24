import { Lifecycle, CommonPhases } from '../classes/Lifecycle';

export type PreviewPhases = CommonPhases | 'restart';

export default class PreviewCycle extends Lifecycle<PreviewPhases> {
  constructor() {
    super();
  }
}
