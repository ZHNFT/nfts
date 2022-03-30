export interface ParserConfig {
  allowUnknownOption?: boolean;
}

export interface ParserDefinition {
  readonly name: string;
  readonly description: string;
  readonly callback?: (args: unknown) => void;
}