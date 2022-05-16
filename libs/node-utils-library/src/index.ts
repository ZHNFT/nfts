import * as Fs from "./FsExtra";
import * as Execution from "./Execution";
import * as Terminal from "./Terminal";
import * as Url from "./Url";
import * as PackageJson from "./package-json";
import * as Utilities from "./utilities";
import { chalk } from "./chalk";
import glob from "./Glob";

import { sync as importSync } from "./Reuqire";

export const req: { sync: typeof importSync } = {
  sync: importSync,
};

export { Utilities };
export { Fs };
export { Execution };
export { Terminal };
export { Url };
export { PackageJson };
export { chalk };
export { glob };
