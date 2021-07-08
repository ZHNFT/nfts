/// require失败给出错误提示
/// 通过模块名称，获取模块导出的方法，捕获导出异常，提供fallback的机会
export const safeRequire = (path: string, fallback?: () => void): any => {
  try {
    return require(path);
  } catch (error) {
    console.error(`\n\n  !!! ${error.message}\n\n`);
    if (fallback) {
      fallback();
    } else {
      process.exit(1);
    }
  }
};
