import { CommandLine } from '@ntfs/noddy';

import { BuildArg } from '../args/BuildArg';
import { DevArg } from '../args/DevArg';
import { GmfConfiguration } from '../config/GmfConfiguration';
import { Constant } from '../Constant';

export class CommandLineTool extends CommandLine {
  constructor() {
    super({
      name: 'gmf',
      description: 'gmf tool'
    });

    const _config = new GmfConfiguration({
      path: Constant.ConfigFilePath
    });

    this.argument(new DevArg());
    this.argument(new BuildArg({ config: _config }));
  }

  analysisConfig() {
    return this;
  }
}
