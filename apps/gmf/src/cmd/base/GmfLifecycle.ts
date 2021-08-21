/**
 *
 */
import { AsyncParallelHook } from 'tapable';

export class GmfLifecycle {
  public start: AsyncParallelHook<any> = new AsyncParallelHook();
}
