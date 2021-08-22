import { GmfAction } from '../base/GmfAction';
import { GmfConfiguration } from '../base/GmfConfiguration';

const ActionName = 'esm';

export class EsmAction extends GmfAction {
  constructor(config: GmfConfiguration) {
    super({
      name: ActionName,
      gmfConfig: config
    });
  }
}
