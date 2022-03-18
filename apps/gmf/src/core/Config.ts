import { resolve } from 'path';
import { readFileSync } from 'fs';

export interface IConfig {
  plugins: {
    action: string;
    phase: string;
    name: string;
  }[];
}

export default class Config {
  static configFile = './config/gmf.json';

  lookup(): IConfig {
    const content = readFileSync(resolve(process.cwd(), Config.configFile));
    return JSON.parse(content.toString('utf-8'));
  }
}
