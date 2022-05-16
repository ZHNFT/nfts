import * as Fs from "./fs-extra";
import * as Json from "./json";
import * as Execution from "./execution";
import * as Terminal from "./terminal";
import * as Url from "./url";
import * as PackageJson from "./package-json";
import * as Utilities from "./utilities";
import * as Module from "./require";
import { chalk } from "./chalk";
import glob from "./Glob";

import { sync as importSync } from "./require";

export const req: { sync: typeof importSync } = {
  sync: importSync,
};

export { Utilities };
export { Fs };
export { Json };
export { Execution };
export { Terminal };
export { Url };
export { PackageJson };
export { Module };
export { chalk };
export { glob };
