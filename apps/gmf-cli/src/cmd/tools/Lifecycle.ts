// 工具内部生命周期

import { SyncHook } from 'tapable';

export class Lifecycle {
  start: SyncHook<any> = new SyncHook<any>();
}
