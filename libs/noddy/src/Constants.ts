export enum OptionKinds {
  String = 'String',
  Boolean = 'Boolean',
  Choices = 'Choices',
  Array = 'Array'
}

export type TOptionKind = keyof typeof OptionKinds;
