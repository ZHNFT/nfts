import { resolve } from 'path';
import { ExtractorConfig, Extractor } from '@microsoft/api-extractor';

let runBefore = false;
const defaultOpts = {
    clear: false,
    cwd: process.cwd(),
};
const combine = (options = { mainEntryPointFilePath: "./index.d.ts" }) => {
    return Object.assign({}, defaultOpts, options);
};
/// generate api-extractor configuration
const createConfig = ({ mainEntryPointFilePath, cwd = process.cwd(), overrides, untrimmedFilePath, }) => ExtractorConfig.prepare(Object.assign({ configObjectFullPath: undefined, configObject: {
        mainEntryPointFilePath,
        compiler: {
            overrideTsconfig: {},
        },
        projectFolder: cwd,
        dtsRollup: {
            enabled: true,
            untrimmedFilePath: untrimmedFilePath !== null && untrimmedFilePath !== void 0 ? untrimmedFilePath : resolve(cwd, "dist/index.d.ts"),
            // betaTrimmedFilePath: betaTrimmedFilePath,
            // publicTrimmedFilePath: publicTrimmedFilePath,
            omitTrimmingComments: true,
        },
    }, packageJsonFullPath: resolve(cwd, "package.json") }, overrides));
/// rollup plugin api-extractor
const apiExtractor = (props) => {
    return {
        name: "api-extractor",
        writeBundle() {
            props = combine(props);
            if (!runBefore) {
                console.log("");
                console.log("Starting api-extractor process...");
                const result = Extractor.invoke(createConfig(props));
                if (result.succeeded) {
                    console.log("api-extractor succeeded");
                }
                else {
                    console.error(`api-extractor finished with ${result.errorCount} errors, and ${result.warningCount} warnings`);
                }
                console.log("");
                runBefore = true;
            }
        },
    };
};

export default apiExtractor;
export { combine, createConfig };
