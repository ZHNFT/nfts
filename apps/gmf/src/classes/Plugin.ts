import { Debug, Command } from "@nfts/noddy";
import { IStageHooks } from "../stages";
import { Configuration } from "./Configuration";

export interface PluginSession<PluginOptions = unknown> {
  command: Command;
  hooks: IStageHooks<PluginOptions>;
  configuration: Configuration;
  getScopedLogger: (scopeName: string) => Debug;
}

export abstract class Plugin<PluginOptions = unknown> {
  abstract readonly name: string;
  abstract readonly summary: string;
  abstract apply(
    session: PluginSession<PluginOptions>,
    options: PluginOptions
  ): void;
}
