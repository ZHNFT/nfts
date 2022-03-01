import { Schema, IJson } from '@ntfs/node-utils-library';

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
  private _json: IJson;
}
