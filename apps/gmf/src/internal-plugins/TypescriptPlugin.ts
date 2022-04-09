import { Plugin, PluginContext } from '../classes/Plugin';

class TypescriptPlugin extends Plugin {
  readonly name: string;
  readonly summary: string;

  apply(ctx: PluginContext, options: unknown | undefined): void | Promise<void> {
    return undefined;
  }
}

export default new TypescriptPlugin();
