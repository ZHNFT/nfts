import { Plugin, PluginSession } from '../../classes/Plugin';

const NAME = 'CleanPlugin';
const DESCRIPTION = 'Cleanup dist';

class CleanPlugin implements Plugin {
  name: string = NAME;
  summary: string = DESCRIPTION;

  apply({ getScopedLogger }: PluginSession): void | Promise<void> {
    const logger = getScopedLogger(NAME);
    logger.log(NAME);
  }
}

export default new CleanPlugin();
