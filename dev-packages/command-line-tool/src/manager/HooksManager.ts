import { SyncHook, AsyncHook } from 'tapable';

export class AsyncHooksManager {
  private readonly _async!: AsyncHook<[], []>;

  constructor() {
    this._async = new AsyncHook();
  }

  get async(): AsyncHook<[], []> {
    return this._async;
  }
}

export class SyncHooksManager {
  private readonly _sync!: SyncHook<[]>;

  constructor() {
    this._sync = new SyncHook();
  }

  get sync(): SyncHook<[]> {
    return this._sync;
  }
}
