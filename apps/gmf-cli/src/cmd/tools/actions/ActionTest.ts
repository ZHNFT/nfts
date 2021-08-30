import { ActionBase } from '@gmf/node-command-line';

export class ActionTest extends ActionBase {
  constructor() {
    super({
      name: 'test'
    });
  }
}
