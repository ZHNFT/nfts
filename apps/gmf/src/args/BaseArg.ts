import { IArgumentDefinition } from '@ntfs/argparser';
import { CommandArgument } from '@ntfs/noddy';
import { GmfConfiguration } from '../config/GmfConfiguration';

export abstract class BaseArg extends CommandArgument {
  abstract readonly _config: GmfConfiguration;
  /**
   * setting argument options
   * */
  abstract onOptionsDefine(): void;
  /**
   * execute when activate
   * */
  abstract exec(args: unknown): void;

  protected constructor(definition: IArgumentDefinition) {
    super({
      name: definition.name,
      description: definition.description
    });

    this.onOptionsDefine();
  }

  protected onLoadPlugins() {}
}
