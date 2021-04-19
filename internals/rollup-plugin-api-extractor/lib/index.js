'use strict';

var path = require('path');
var fs$1 = require('fs');
var fs = require('fs-extra');
var apiExtractor = require('@microsoft/api-extractor');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__namespace = /*#__PURE__*/_interopNamespace(fs);

/**
 * @microsoft/api-extractor binding with rollup
 */
function runExtractor(ref) {
    var configFile = ref.configFile;
    ref.generateDist;
    var invokeOptions = ref.invokeOptions;

    if (configFile) {
        console.log("");
        console.log("> rpae: generating .d.ts, using @microsoft/api-extractor");
        console.log("> rpae: using configuration from -> " + configFile);
        console.log("");
    }
    // Load and parse the api-extractor.json file
    var extractorConfig = apiExtractor.ExtractorConfig.loadFileAndPrepare(configFile);
    // Invoke API Extractor
    var extractorResult = apiExtractor.Extractor.invoke(extractorConfig, invokeOptions);
    if (extractorResult.succeeded) {
        process.exitCode = 0;
    }
    else {
        console.log(extractorResult.errorCount);
        process.exitCode = 1;
    }
}
var isDev = process.env.NODE_ENV === "development";
var defaultConfigFile = [
    path__default['default'].resolve(process.cwd(), "config/api-extractor.json"),
    path__default['default'].resolve(process.cwd(), "api-extractor.json") ].filter(fs$1.existsSync)[0];
var defaultGenerateDist = path__default['default'].resolve(process.cwd(), "dist");
/**
 *
 * @param configFile
 * @param cleanup
 * @param invokeOptions
 * @param generateDist
 * @param override
 *
 * @public
 */
function index (ref) {
    if ( ref === void 0 ) ref = {};
    var configFile = ref.configFile; if ( configFile === void 0 ) configFile = defaultConfigFile;
    var cleanup = ref.cleanup; if ( cleanup === void 0 ) cleanup = false;
    var invokeOptions = ref.invokeOptions; if ( invokeOptions === void 0 ) invokeOptions = {
    localBuild: isDev,
    showVerboseMessages: isDev,
};
    var generateDist = ref.generateDist; if ( generateDist === void 0 ) generateDist = defaultGenerateDist;
    var override = ref.override; if ( override === void 0 ) override = {};

    return {
        name: "api-extractor",
        writeBundle: function () {
            if (cleanup) {
                fs__namespace.rmdirSync(path__default['default'].isAbsolute(generateDist)
                    ? generateDist
                    : path__default['default'].resolve(process.cwd(), generateDist));
            }
            runExtractor({ configFile: configFile, invokeOptions: invokeOptions, generateDist: generateDist, override: override });
        },
    };
}
// `API Extractor completed successfully`)
// `API Extractor completed with ${extractorResult.errorCount} errors` +
//       ` and ${extractorResult.warningCount} warnings`

module.exports = index;
