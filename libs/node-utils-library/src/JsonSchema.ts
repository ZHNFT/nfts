import { IJson } from './internal/Json';
export class JsonSchema {
  // 校验json是否符合schema的标准
  validateJson(json: IJson): boolean {
    return true;
  }
}
