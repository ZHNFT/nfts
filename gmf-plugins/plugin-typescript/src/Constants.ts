export default class Constants {
  public static tsconfigPath = "./tsconfig.json";

  public static includes = "./src/**/*.{js,ts,jsx,tsx}";

  public static excludes = [
    "**/node_modules/**",
    "**/*.{spec,test}.{js,ts,jsx,tsx}",
    "**/__tests__/**/*.{spec,test}.{js,ts,jsx,tsx}",
  ];
}
