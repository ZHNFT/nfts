import path from "path";
import { CommandImpl } from "./Command";

const nodeModules = path.resolve(process.cwd(), "node_modules");

export const safeImport = (modulePath: string): Promise<CommandImpl> => {
  return new Promise<CommandImpl>((resolve, reject) => {
    import(path.resolve(nodeModules, modulePath, "dist/index.js"))
      .then((func) => {
        resolve(func);
      })
      .catch((e) => reject(e));
  });
};

export const getTime = (): string => {
  return new Date().toLocaleTimeString();
};
