import { Plugin, PluginContext } from '../../classes/Plugin';

const NAME = 'CopyPlugin';
const DESCRIPTION = 'Copy file/folders form place to place';

class CopyPlugin implements Plugin {
  name: string = NAME;
  summary: string = DESCRIPTION;

  apply({ getScopedLogger }: PluginContext): void | Promise<void> {
    const logger = getScopedLogger(NAME);
    logger.log(NAME);
  }
}

export default new CopyPlugin();
