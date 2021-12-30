import { BasePackagesManager } from '../../base/BasePackagesManager';

export class PnpmPackagesManager extends BasePackagesManager {
  install(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  uninstall(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  link(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  workspace(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
