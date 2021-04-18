import path from "path"

const execRoot = process.cwd()

export type ResolveByBasepathOptions = { basepath?: string }

/**
 * resolve path base on basepath
 * @return {string}
 * @public
 * @param pAth
 * @param opts
 */
export function resolveByBasepath(
  pAth: string | string[],
  opts?: ResolveByBasepathOptions
): string {
  if (!opts) opts = {}
  let { basepath } = opts

  if (!basepath) {
    basepath = execRoot
  }

  if (Array.isArray(pAth)) {
    return path.join(basepath, ...pAth)
  }

  return path.join(basepath, pAth)
}
