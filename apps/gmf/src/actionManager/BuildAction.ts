import { BaseAction } from '../../../../libs/command-line/src/base/BaseAction';
import type { IGmfSession } from '../cli/Gmf';

export interface IBuildOptions {}

export class BuildAction extends BaseAction<IGmfSession, IBuildOptions> {
  apply(session: IGmfSession, config: IBuildOptions): void {
    throw new Error('Method not implemented.');
  }
}
