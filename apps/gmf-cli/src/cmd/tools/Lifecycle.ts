// 工具内部生命周期

import { SyncHook } from 'tapable';

export class InternalPluginContext {}

export class Lifecycle {
  start: SyncHook<InternalPluginContext> =
    new SyncHook<InternalPluginContext>();
}
