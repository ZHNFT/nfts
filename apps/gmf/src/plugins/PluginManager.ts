import { Config } from '../cli/Config';
import { IGmfConfiguration } from '../cli/Gmf';

export interface IPluginManagerInitOptions {
  //
  config: Config<IGmfConfiguration>;
}

export class PluginManager {
  _config: Config<IGmfConfiguration>;

  constructor({ config }: IPluginManagerInitOptions) {
    this._config = config;
  }
}
