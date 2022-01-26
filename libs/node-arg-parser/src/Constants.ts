export const enum TokenKind {
  // command kind
  CommandKind,
  SubCommandKind,
  SeparateKind,
  OperationKind,
  LongFlagNameKind,
  ShortFlagNameKind,
  ValueKind,
  BolKind,
  EolKind
}

export class FlagNameRegex {
  public static LongNameRegex = /^--\w/;
  public static ShortNameRegex = /^-\w/;
}
