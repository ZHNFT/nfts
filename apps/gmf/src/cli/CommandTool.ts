import { CommandLine } from "@nfts/noddy";
import { PluginManager } from "../classes/PluginManager";
import { Configuration } from "../classes/Configuration";
import { BundleCommand } from "./commands/BundleCommand";
import { BuildCommand } from "./commands/BuildCommand";
import { BuildStage, BundleStage } from "../stages";

export default class GmfTool extends CommandLine {
  private readonly _pluginManager: PluginManager;
  private readonly _config: Configuration;

  constructor() {
    super({ toolName: "gmf", toolDescription: `Develop toolchain` });

    this._config = new Configuration();

    const buildStage = new BuildStage();
    const bundleStage = new BundleStage();

    const stages = {
      build: buildStage,
      bundle: bundleStage,
    };

    const build = new BuildCommand({ stage: stages.build });
    const bundle = new BundleCommand({ stage: stages.bundle });

    this._pluginManager = new PluginManager(this._config, stages, build);

    this.addCommand(build);
    this.addCommand(bundle);
  }

  // private _loadConfigFromCommandLine() {
  //   const { _: commandName, ...params } = this.parseCommandLine();
  // }

  public exec(): Promise<void> {
    // this._loadConfigFromCommandLine();
    this._pluginManager.initPluginsFromConfiguration();
    return this.execute();
  }

  onExecute(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
