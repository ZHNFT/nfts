import { readFileSync } from 'fs';
import * as JSON5 from 'json5';

export const loadJsonSync = <T extends unknown>(filePath: string): T => {
  const jsonBuf = readFileSync(filePath);
  return JSON5.parse(jsonBuf.toString('utf-8'));
};
