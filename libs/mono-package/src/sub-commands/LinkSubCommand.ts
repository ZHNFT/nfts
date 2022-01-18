import { BaseSubCommand } from '@ntfs/command-line';
import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { MonoPackagesConfig } from '../config/MonoPackagesConfig';

export class LinkSubCommand extends BaseSubCommand {
  config: MonoPackagesConfig;

  constructor({ parser, config }: { parser: ArgumentsParser; config: MonoPackagesConfig }) {
    super({
      subCommandName: 'link',
      subCommandDescription: '关联包',
      parser: parser
    });

    this.config = config;
  }

  initialize(): BaseSubCommand {
    return this;
  }

  apply(): Promise<void> {
    console.log('Link command');
    return Promise.resolve();
  }

  onParametersDefine(): void {
    //
  }
}
