import { CommandLineTool } from '@ntfs/command-line';
import { MonoPackagesConfig } from '../config/MonoPackagesConfig';

export class MonoPackagesTool extends CommandLineTool {
  private _config: MonoPackagesConfig;

  public constructor() {
    super({
      toolName: 'mono-package',
      toolDescription: 'this is a mono-package description'
    });

    this._config = new MonoPackagesConfig();
  }

  public prepare(): MonoPackagesTool {
    return this;
  }

  public run(): Promise<void> {
    return Promise.resolve();
  }
}
