import { IArgumentDefinition } from '@ntfs/argparser';
import { CommandArgument } from '@ntfs/noddy';

export abstract class BaseArg extends CommandArgument {
  /**
   * setting argument options
   * */
  abstract onOptionsDefine(): void;
  /**
   * execute when activate
   * */
  abstract exec(args: unknown): void;

  abstract initPlugins(): void;

  protected constructor(definition: IArgumentDefinition) {
    super({
      name: definition.name,
      description: definition.description
    });

    this.onOptionsDefine();
  }
}
