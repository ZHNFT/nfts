# rollup/plugin-api-extractor

- 将@microsoft/api-extractor 结合到 rollup 的构建流程。

## 例子

```js
import apiExtractor from "@initializer/api-extractor";

const rollupPlugins = {
  /// other plugins
  apiExtractor({
    mainEntryPointFilePath: "where/dts/entry/file/is",
    clear: true,
    cwd: "/cwd/"
  })
}

```

- mainEntryPointFilePath
  dts 入口文件，api-extractor 通过这个入口文件分析依赖，将依赖打包成一个文件。

- clear

- cwd
  当前构建的工作根目录，通过这个路径确定打包文件的最终路径
