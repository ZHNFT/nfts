export default class Constants {
  // @desc 默认excludes的文件pattern
  public static excludes = [
    "**/node_modules/**",
    "**/*.{spec,test}.{js,ts,jsx,tsx}",
    "**/__tests__/**/*.{spec,test}.{js,ts,jsx,tsx}",
  ];
  // @desc 默认includes的文件pattern
  public static include = "./src/**/*.{js,ts,jsx,tsx}";
}
