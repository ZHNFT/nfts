# Scripts

## 指令

- preview

  preview 指令会使用 snowpack 来运行 demo 下的文件，以及 dist 目录下的文件，一旦两个目录下有文件的修改，snowpack 会重新启动。

- dev

  dev 指令会启动 rollup 的 watcher 进程，根据你的修改重

- build

  build 指令会使用 rollup 来打包你的项目文件

- test

  test 指令会使用 jest 运行只指定子项目中的测试用例

- release

  release 指令会调用 pnpm publish 指令来发布指定的项目，中间也会调用 git 来提交推送你的本地文件修改。
