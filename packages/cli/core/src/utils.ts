import { CommandImpl } from "./Command";

export const safeImport = (path: string): Promise<CommandImpl> => {
  return new Promise<CommandImpl>((resolve, reject) => {
    import(path)
      .then((func) => {
        resolve(func);
      })
      .catch((e) => reject(e));
  });
};
