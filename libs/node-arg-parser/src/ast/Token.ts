export default class Token {
  type: string;
  value?: string;
  pos: {
    start: number;
    end: number;
  };

  public constructor({ value, pos }: { value: string; pos: { start: number; end: number } }) {
    this.setValue(value);
    this.setPos(pos);
  }

  /**
   * 设置位置信息
   * @param start
   * @param end
   */
  public setPos({ start, end }: { start: number; end: number }): void {
    this.pos.end = end;
    this.pos.start = start;
  }

  /**
   * 设置值
   * @param value
   */
  public setValue(value: string): void {
    this.value = value;
  }
}
