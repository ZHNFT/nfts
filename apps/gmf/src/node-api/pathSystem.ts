import { existsSync, accessSync } from 'fs';
import { isAbsolute, join } from 'path';
import { NodeError } from './errors';

export const fileExists = (
  filePath: string,
  cwd: string = process.cwd()
): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!isAbsolute(filePath)) {
      filePath = join(cwd, filePath);
    }

    try {
      existsSync(filePath);
      accessSync(filePath);
    } catch (e) {
      reject(
        new NodeError(
          "[FILE NOT EXISTS or CAN'T ACCESS]",
          `The file you accessed is NOT exists or accessible: ${filePath}`
        )
      );
    }
  });
