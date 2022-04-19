export interface IConfig {
  plugins: {
    pluginName: string;
    [index: string]: string;
  }[];
}

/**
 * gmf 需要的配置文件，
 */
export class Configuration {
  public loadConfig(): IConfig | undefined {
    // return FileSystem.readJsonSync<IConfig>(Constants.DEFAULT_GMFCONFIG_PATH);
    return {
      plugins: []
    };
  }
}
