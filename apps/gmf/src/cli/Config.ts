import { FileSys } from '../../../../libs/node-library/src/FileSys';
import { GMF_CONFIG_FILE_PATH } from '../Constants';

export class Config<TConfig> extends FileSys {
  _configCache: TConfig;

  constructor() {
    super(GMF_CONFIG_FILE_PATH);

    this._configCache = this.readJsonFile();
  }

  public mergeConfig(config: Partial<TConfig>): TConfig {
    // todo Merge Logic
    return this._configCache;
  }
}
