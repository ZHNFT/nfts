# Library build toolkit

- 目录条件

  保证指令能够正常运行的一些基本条件

  - 根目录文件结构要求

    如果是在使用 monorepo 的前提下，这些指令都支持 npm/yarn 或者 pnpm 的 workspace 方案，
    可以通过 --scope 来指定多个需要操作 monorepo 下的库，库名称使用逗号分隔。
    最重要的是根目录下 package.json 中的 workspaces 字段，一定要指定。

    如果是普通的单库结构，不需要在执行的指令后指定任何选项，会自动识别根目录为被指定的库

  - workspace 中的单个库的目录结构

    对于 worksapce 指定的所有单个库。每个库的 package.json 都需要一些必须的字段，用于 rollup 的构建，

    🌰

    ```json
    {
      "name": "@my/package1",
      "main": "/src/index.ts", /// 这是一个很重要的字段，rollup通过这个字段来作为构建的入口文件
      "exports": {
        "node": "./dist/index.cjs", /// node环境下访问的脚本，文件名字和 main 字段保持一致
        "default": "./dist/index.js" /// esm环境下访问的脚本，文件名字和 main 字段保持一致
      }
    }
    ```

    上面提到的这两个字段很重要，main 和 exports，如果缺失的话，构建会失败。

    preview 指令会通过监测文件目录中是否存在 demo 来决定是否启动，demo 目录下存放简单的调试代码。
    demo 目录一般和 pckage.json 处于同级。demo 目录一般如下所示

    demo
    |-src
    | |-index.ts /// index.ts 中可以直接引用 dist 目录中构建好的文件，方便测试。
    | | /// 如例子中的格式，就可以直接`import xxx from "../../dist/package.dist"`
    |-index.html /// index.html 文件可以直接通过<script src="src/index.js" type="module" ></script>来引用 snowpack 编译好的 js 文件
    dist
    ｜-package.dist.cjs
    ｜-package.dist.js
    src
    tests
    package.json

    对于测试文件，统一放置于与 package.json 同一级，名称为 tests

- 可选的指令选项

  1. scope
     <toolkit [command] --scope=packahe1,package2,package3>

  2. ignore
     <toolkit [command] --ignore=package1,package2>

  3. type
     type 是专门针对 release 指令的选项，用于指定更新的版本
     <toolkit release --type=patch | minor | major>

1. toolkit dev
   启动 rollup 的 watcher 服务，修改源码之后会马上重新进行构建。

2. toolkit build
   启动 rollup 的 bundle 命令，输出最终用于发布的源码。

3. toolkit runTests
   使用 jest 进行测试文件的执行，为了性能，只执行指定的包下的 test 文件。
   在 monorepo 的库文件结构下，通过 scope 选项进行指定包。
   toolkit runTests --scope=package-you-want-to-run
   对于单一构建的仓库，不需要指定 scope

4. toolkit preview
   使用 preview 指令的前提，需要在更目录下有 demo 文件夹，这个文件夹中存放 demo 的源码。
   preview 指令会调用 snowpack 来启动开发服务（快就一个字，谁用谁知道）。
   默认情况下，rollup 生成的 dist 文件夹也会被 snowpack 监视，这样可以保证 dev 进程的 bundle 产物也会触发 snowpack 的 re-build
