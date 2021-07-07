/**
 * rollup
 */
import { RollupBuild, rollup, RollupOptions } from "rollup";

export const rollupBuild = async (
    rollupOptions: RollupOptions
): Promise<RollupBuild> => {
    const bundle = await rollup(rollupOptions);
    return bundle;
};

export const generate = async (bundle: RollupBuild, options: RollupOptions) => {
    await bundle.generate(options);
    await bundle.write(options);
};
