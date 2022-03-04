import { Schema, IJson, FileSystem } from '@ntfs/node-utils-library';

/**
 * 定义plugin
 * */
export interface IGmfPlugin {
  name: string;
  description: string;
  schemaPath?: string;
}

export interface IGmfConfiguration {
  plugins: IGmfPlugin[];
}

export class GmfConfiguration {
  private _schema: Schema;
  private readonly _json: IGmfConfiguration;

  constructor({ path }: { path: string }) {
    this._json = FileSystem.readJsonSync(path) as unknown as IGmfConfiguration;
  }

  public get json(): IGmfConfiguration {
    return this._json;
  }
}
