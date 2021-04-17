export declare type ResolveByBasepathOptions = {
    basepath?: string;
};
/**
 * resolve path base on basepath
 * @param  {string | string[]}
 * @param  {ResolveByBasepathOptions}
 * @return {string}
 * @public
 */
export declare function resolveByBasepath(pAth: string | string[], { basepath }: ResolveByBasepathOptions): string;
