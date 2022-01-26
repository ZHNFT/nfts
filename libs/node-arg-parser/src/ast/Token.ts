export type TTokenPos = {
  start: number;
  end: number;
};

export default class Token {
  kind: number;
  buffer?: string;
  pos: TTokenPos;

  public constructor({ value, pos, kind }: { value: string; pos: TTokenPos; kind: number }) {
    this.setValue(value);
    this.setPos(pos);

    this.kind = kind;
  }

  /**
   * 设置位置信息
   * @param pos
   */
  public setPos(pos: TTokenPos): void {
    this.pos = pos;
  }

  /**
   * 设置值
   * @param value
   */
  public setValue(value: string): void {
    this.buffer = value;
  }
}
