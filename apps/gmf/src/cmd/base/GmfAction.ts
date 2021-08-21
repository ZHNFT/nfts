/**
 * @public 操作。
 */
import { GmfConfiguration } from './GmfConfiguration';

export interface IGmfActionInitOptions {
  name: string;
  description: string;
  gmfConfig: GmfConfiguration;
}

export class GmfAction {
  readonly name: string;
  readonly description: string;
  readonly gmfConfig: GmfConfiguration;

  constructor({ name, description, gmfConfig }: IGmfActionInitOptions) {
    this.name = name;
    this.description = description;
    this.gmfConfig = gmfConfig;
  }
}
