/**
 * @class CleanEvent
 */
import * as fs from 'fs';
import { EventBase } from '@gmf/node-command-line';
import { GmfConfig } from '../cli/framework/GmfConfig';

export class CleanEvent extends EventBase {
  private readonly _config: GmfConfig;

  constructor(config: GmfConfig) {
    super({ name: 'clean' });

    this._config = config;
  }

  apply(): void {
    // clean dist folder
    fs.rmdirSync(this._config.config.buildPath, { maxRetries: 2 });
  }
}
