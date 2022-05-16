import path from "path";
import { Fs } from "@nfts/node-utils-library";
import { Debug } from "@nfts/noddy";
import { Plugin, PluginSession } from "../../classes/Plugin";
import { existsSync } from "fs";

const NAME = "CleanPlugin";
const DESCRIPTION = "Cleanup dist";

const CleanupDistPath = "./dist";

class CleanPlugin implements Plugin {
  name: string = NAME;
  summary: string = DESCRIPTION;

  logger!: Debug;

  apply({ getScopedLogger, hooks }: PluginSession): void | Promise<void> {
    this.logger = getScopedLogger(NAME);

    hooks.build.add(NAME, (build) => {
      if (build.cmdParams.clean) {
        build.hooks.preCompile.add(NAME, this.cleanupDist);
      }
    });

    hooks.bundle.add(NAME, (bundle) => {
      if (bundle.cmdParams.clean) {
        bundle.hooks.preCompile.add(NAME, this.cleanupDist);
      }
    });
  }

  private cleanupDist = async () => {
    this.logger.log(`Cleanup dist...`);

    const targetPath = path.resolve(process.cwd(), CleanupDistPath);

    if (existsSync(targetPath)) {
      await Fs.rmdirRecursion(targetPath);
    }
  };
}

export default new CleanPlugin();
