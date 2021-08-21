import { GmfAction } from '../base/GmfAction';

export class EsmAction extends GmfAction {
  constructor() {
    super({
      name: 'esm',
      description: 'Startup esm build process'
    });
  }
}
