export abstract class TJsonSchema {
  abstract loadJsonSchema(): void;
  abstract validateJsonSchema(): void;
}

export class JsonSchema implements TJsonSchema {
  loadJsonSchema(): void {
    throw new Error('Method not implemented.');
  }
  validateJsonSchema(): void {
    throw new Error('Method not implemented.');
  }
}
