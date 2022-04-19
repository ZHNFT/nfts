/**
 * 封装一些关于 PackageJson 操作的方法，以及数据类型定义
 * @status WIP
 */
export interface IPackageAuthor {
  name: string;
  email?: string;
  url: string;
}

export interface IPackageRepository {
  type: 'git' | 'svn';
  url: string;
}

export interface IPackageJson {
  /**
   * 设置软件包的名称
   */
  name: string;
  /**
   * 设置软件包的入口点。
   */
  main: string;
  /**
   * 包版本
   */
  version: string;
  /**
   * 包的作者名称
   */
  author?: string | IPackageAuthor;
  /**
   * 代码贡献者
   */
  contributors?: string[] | IPackageAuthor[];
  /**
   * 指定软件包的许可证
   */
  license?: string;
  /**
   * 此属性包含与软件包功能相关的关键字数组
   */
  keywords?: string[];
  /**
   * 此属性包含了对软件包的简短描述
   */
  description?: string;
  /**
   * 此属性指定了此程序包仓库所在的位置。
   */
  repository?: string | IPackageRepository;
  /**
   * 如果设置为 true，则可以防止应用程序/软件包被意外发布到 npm 上。
   */
  private?: boolean;
  /**
   * 可以定义一组可以运行的 ast-node 脚本。
   */
  scripts?: Readonly<Record<string, string>>;
  /**
   * 设置作为依赖安装的 npm 软件包的列表。
   */
  dependencies?: Record<string, string>;
  /**
   * 设置作为开发依赖安装的 npm 软件包的列表。
   */
  devDependencies?: Record<string, string>;
  /**
   * 设置此软件包/应用程序要运行的 Node.scripts.js 或其他命令的版本。
   */
  engines?: Record<string, string>;
  /**
   * 用于告知要支持哪些浏览器（及其版本）。
   * Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。
   */
  browserslist?: string[];
}
