import { CommandLineToolDefinition } from '../../../../libs/command-line/src/index';
import { ActionManager } from '../actionManager';
import { PluginManager } from '../pluginManager';
import { Config } from './Config';
import { ParameterKinds } from '../../../../libs/command-line/src/parameters/ParameterDefinition';

export interface IGmfSession {
  hooks: unknown;
  gmfConfig: unknown;
}

export interface IGmfConfiguration {
  parameters: {
    paramName: string;
    paramDescription?: string;
  }[];
}

export class Gmf extends CommandLineToolDefinition {
  private _actionManager: ActionManager;
  private _pluginManager: PluginManager;

  private _config: Config<IGmfConfiguration>;

  public constructor() {
    super({
      toolName: 'gmf',
      toolDescription: 'Command Line Tool For Package Development'
    });

    this._actionManager = new ActionManager();
    this._pluginManager = new PluginManager();

    // Register Parameter
    /**
     * --config Specify Configuration File Path
     */
    this._parser.registerParameter({
      name: '--config',
      shortName: '-c',
      kind: ParameterKinds.string,
      required: false
    });

    this._config = this._prepareConfiguration();
    this._mergeConfigurationFromCommandLineOptions();
    this._parser.exec(process.argv.slice(2));
  }

  /**
   *
   * @returns {Config} Read Configuration From Config File
   */
  private _prepareConfiguration(): Config<IGmfConfiguration> {
    return new Config();
  }

  /**
   * @returns {Config} Read Configuration From CommandLine Arguments
   */
  private _mergeConfigurationFromCommandLineOptions(): IGmfConfiguration {
    const config = this._parser.getParameters();
    return this._config.mergeConfig(config);
  }
}
