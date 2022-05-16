import path from "path";
import { Fs } from "@nfts/node-utils-library";
import { Debug } from "@nfts/noddy";
import { Plugin, PluginSession } from "../../classes/Plugin";
import { existsSync } from "fs";

const NAME = "CleanPlugin";
const DESCRIPTION = "Cleanup dist";

class CleanPlugin implements Plugin {
  name: string = NAME;
  summary: string = DESCRIPTION;

  logger!: Debug;

  apply({
    getScopedLogger,
    hooks,
    configuration,
  }: PluginSession): void | Promise<void> {
    this.logger = getScopedLogger(NAME);

    const cleanBuildPath = path.resolve(
      process.cwd(),
      configuration.loadConfig()?.buildPath ?? "./dist"
    );

    hooks.build.add(NAME, (build) => {
      if (build.cmdParams.clean) {
        build.hooks.preCompile.add(NAME, () =>
          this.cleanupDist(cleanBuildPath)
        );
      }
    });

    hooks.bundle.add(NAME, (bundle) => {
      if (bundle.cmdParams.clean) {
        bundle.hooks.preCompile.add(NAME, () =>
          this.cleanupDist(cleanBuildPath)
        );
      }
    });
  }

  private cleanupDist = async (path: string) => {
    if (existsSync(path)) {
      await Fs.rmdirRecursion(path);
      return;
    }

    this.logger.log(`Path is not exist`);
  };
}

export default new CleanPlugin();
