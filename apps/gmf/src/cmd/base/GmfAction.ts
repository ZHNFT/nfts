/**
 * @public 操作。
 */
import { GmfConfiguration } from './GmfConfiguration';

export interface IGmfActionInitOptions {
  name: string;
  gmfConfig: GmfConfiguration;
}

export class GmfAction {
  readonly name: string;
  readonly gmfConfig: GmfConfiguration;

  constructor({ name, gmfConfig }: IGmfActionInitOptions) {
    this.name = name;
    this.gmfConfig = gmfConfig;
  }

  enqueuePlugin() {}
}
