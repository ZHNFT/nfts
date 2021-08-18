import { SyncWaterfallHook, AsyncSeriesWaterfallHook } from 'tapable';

/**
 * @class Lifecycle
 */
class Lifecycle {
  before: AsyncSeriesWaterfallHook<string, string>;
  after: SyncWaterfallHook<string>;
  preocess: SyncWaterfallHook<string>;

  constructor() {
    this.before = new AsyncSeriesWaterfallHook<string, string>(['before']);
    this.preocess = new SyncWaterfallHook<string>(['process']);
    this.after = new SyncWaterfallHook<string>(['after']);
  }
}

class PluginManager {
  lifecycle: Lifecycle;

  constructor() {
    this.lifecycle = new Lifecycle();
  }
}

const aa = new PluginManager();

aa.lifecycle.before.tap('plugin-a', (args) => {
  console.log('plugin-a', args);

  return args + '1';
});

aa.lifecycle.before.tap('plugin-b', (args) => {
  console.log('plugin-b', args);

  return args + '2';
});

aa.lifecycle.before.tap('plugin-c', (args) => {
  console.log('plugin-c', args);

  return args + '3';
});

aa.lifecycle.before.promise('999').then((result) => {
  console.log('4', result);
});
