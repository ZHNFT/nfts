import { CommandLine } from '@ntfs/noddy';

import { BuildArg } from '../args/BuildArg';
import { DevArg } from '../args/DevArg';

export class CommandLineTool extends CommandLine {
  constructor() {
    super({
      name: 'gmf',
      description: 'gmf tool'
    });

    this.argument(new DevArg());
    this.argument(new BuildArg());
  }

  analysisConfig() {
    //
    return this;
  }
}
