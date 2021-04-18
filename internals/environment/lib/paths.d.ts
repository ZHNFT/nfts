export declare type ResolveByBasepathOptions = {
    basepath?: string;
};
/**
 * resolve path base on basepath
 * @return {string}
 * @public
 * @param pAth
 * @param opts
 */
export declare function resolveByBasepath(pAth: string | string[], opts?: ResolveByBasepathOptions): string;
