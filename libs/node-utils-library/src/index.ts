import * as Fs from './Fs';
import * as Json from './Json';
import * as Measure from './Measure';
import * as Execution from './Execution';
import * as Screen from './Screen';
import * as Host from './Host';
import * as PackageJson from './package-json';

import { ArrayUtils, ObjectUtils } from './DataUtils';
import { sync as importSync } from './Import';

/**
 * Module Importer
 */
export const req: { sync: typeof importSync } = {
  sync: importSync
};

/**
 * Utilities
 */
export const utils: { array: typeof ArrayUtils; object: typeof ObjectUtils } = {
  array: ArrayUtils,
  object: ObjectUtils
};

/**
 * File/folder operations
 */
export { Fs };

/**
 * JSON operations
 */
export { Json };
/**
 * Task measure
 */
export { Measure };
/**
 * Tasks execution flow control
 */
export { Execution };
/**
 * Terminal screen control
 */
export { Screen };
/**
 * Url parser
 */
export { Host };
/**\
 * package.json file operation and type definitions
 */
export { PackageJson };
