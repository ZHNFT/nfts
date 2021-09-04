import { ActionBase } from '@gmf/node-command-line';

export class ActionBuild extends ActionBase {
  constructor() {
    super({
      actionName: 'build'
    });
  }
}
