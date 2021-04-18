# Scripts

- 创建新的包

  `pnpm bootstrap`

- 构建

  支持同时构建多个包

  - 开发模式

    `pnpm dev --scope=package1,package2 --ignore=package3,package4`

  - 生产模式

    `pnpm build --scope=package1,package2 --ignore=package3,package4
