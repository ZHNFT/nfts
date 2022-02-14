import { TextRange } from './TextRange';

export enum TokenTypes {
  EndOfSource = 'EndOfSource', // 结束
  Space = 'Space', // 空格
  Text = 'Text', // 普通文本
  LongFlag = 'LongFlag', // 参数标识 --sample
  ShortFlag = 'ShortFlag' // 参数标识 -s
}

export class Token {
  public readonly kind: keyof typeof TokenTypes;
  public readonly range: TextRange;
  public readonly text?: string;

  public constructor(kind: keyof typeof TokenTypes, range: TextRange, text?: string) {
    this.range = range;
    this.text = text;
    this.kind = kind;
  }

  public toString(): string {
    return this.text.toString();
  }
}
