export class Keys {
  public static isEnterKey(sequence: string): boolean {
    return sequence === '\r';
  }
  public static isUpKey(sequence: string): boolean {
    return sequence === '\x1B[A';
  }
  public static isDownKey(sequence: string): boolean {
    return sequence === '\x1B[B';
  }
  public static isRightKey(sequence: string): boolean {
    return sequence === '\x1B[C';
  }
  public static isLeftKey(sequence: string): boolean {
    return sequence === '\x1B[D';
  }
}
