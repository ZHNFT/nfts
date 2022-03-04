import { BaseArg } from './BaseArg';

export interface IDevArgOptions {
  clean: boolean;
}

export class DevArg extends BaseArg {
  constructor() {
    super({ name: 'dev', description: 'Start up local development server' });
  }

  onOptionsDefine(): void {
    this.option({
      name: '--clean',
      required: false,
      description: 'Cleanup dist folder'
    });
  }

  exec(args: IDevArgOptions): void {
    console.log('development');
  }
}
