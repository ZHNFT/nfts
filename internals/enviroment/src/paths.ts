import * as path from "path"

const execRoot = process.cwd()

export type ResolveByBasepathOptions = { basepath?: string }

/**
 * resolve path base on basepath
 * @param  {string | string[]}
 * @param  {ResolveByBasepathOptions}
 * @return {string}
 * @public
 */
export function resolveByBasepath(
  pAth: string | string[],
  { basepath }: ResolveByBasepathOptions
): string {
  if (!basepath) {
    basepath = execRoot
  }

  if (Array.isArray(pAth)) {
    return path.join(basepath, ...pAth)
  }

  return path.join(basepath, pAth)
}
