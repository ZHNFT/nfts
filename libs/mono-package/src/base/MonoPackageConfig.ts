import { FileSys } from '@ntfs/node-utils-library';
import { Constants } from '../Constants';

export class MonoPackageConfig extends FileSys {
  constructor(configPath?: string) {
    super(configPath ?? Constants.monoPackagesConfigurationDefaultPath);
  }
}
