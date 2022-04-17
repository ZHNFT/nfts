import { Measure as Measure_ } from '@nfts/node-utils-library';
import { Debug } from '../debug/Debug';

export class Measure {
  private _debug: Debug;

  constructor({ debug }: { debug: Debug }) {
    this._debug = debug;
  }

  /**
   * 计算同步方法执行的时间
   * @param mark
   * @param task
   */
  public syncTask(mark: string, task: () => void) {
    Measure_.taskSync(mark, () => task(), this._debug.log);
  }

  /**
   * 计算异步方法执行的时间
   * @param mark
   * @param task
   */
  public async asyncTask(mark: string, task: () => Promise<void>): Promise<void> {
    return Measure_.taskAsync(mark, () => task(), this._debug.log);
  }
}
