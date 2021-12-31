import { FileSys } from '@ntfs/node-utils-library';
import { Constants } from '../Constants';
export class MonoPackageConfig extends FileSys {
    constructor(configPath) {
        super(configPath !== null && configPath !== void 0 ? configPath : Constants.monoPackagesConfigurationDefaultPath);
    }
}
