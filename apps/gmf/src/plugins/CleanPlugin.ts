import { BasePlugin } from './BasePlugin';

export class CleanPlugin extends BasePlugin {
  name: 'clean';
  description: 'Clean up dist';

  async apply(): Promise<void> {
    //
  }
}
