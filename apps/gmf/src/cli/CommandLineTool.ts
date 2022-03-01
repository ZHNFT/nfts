import { CommandLine } from '@ntfs/noddy';

import { BuildArg } from '../args/BuildArg';
import { DevArg } from '../args/DevArg';
import { GmfConfiguration } from '../config/GmfConfiguration';

export class CommandLineTool extends CommandLine {
  constructor() {
    super({
      name: 'gmf',
      description: 'gmf tool'
    });

    const _config = new GmfConfiguration();

    this.argument(new DevArg());
    this.argument(new BuildArg({ config: _config }));
  }

  analysisConfig() {
    return this;
  }
}
