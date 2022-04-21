import * as Fs from './Fs';
import * as Async from './Async';
import { sync as importSync } from './Import';
import { IPackageJson } from './IPackageJson';
import * as Json from './Json';
import * as Measure from './Measure';
import * as Sync from './Sync';
import * as Execution from './Execution';
import * as DateEx from './Date';

export { PackageJson } from './packageJson/PackageJson';
export { PackageJsonLookup } from './packageJson/PackageJsonLookup';
export { Schema } from './Schema';
export { FileSystem } from './FileSystem';
export { ImportModule } from './ImportModule';

// Fs
export { Fs };

// Async
export { Async };

// Sync
export { Sync };

// Json
export { Json };

// Measure
export { Measure };

// Import
export { importSync };

// Package
export { IPackageJson };

// Execution
export { Execution };

// Date
export { DateEx };

// Task
export type TTAsk<TArgs = unknown, TReturn = unknown> =
  | Sync.Task<TArgs>
  | Sync.TaskWithReturnType<TArgs, TReturn>
  | Async.Task<TArgs>
  | Async.TaskWithReturnType<TArgs, TReturn>;
