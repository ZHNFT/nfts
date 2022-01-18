import { FileSys } from '@ntfs/node-utils-library';
import { Constants } from '../Constants';

export class MonoPackagesConfig extends FileSys {
  constructor(configPath?: string) {
    super(configPath ?? Constants.monoPackagesConfigurationDefaultPath);
  }
}
