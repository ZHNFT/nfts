import { BasePlugin } from './BasePlugin';

export class CleanPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'clean',
      description: 'clean that shit'
    });
  }

  async apply(): Promise<void> {
    //
  }
}
