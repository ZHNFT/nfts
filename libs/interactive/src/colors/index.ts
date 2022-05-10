export enum TextColorNumbers {
  black = 30,
  red = 31,
  green = 32,
  yellow = 33,
  blue = 34,
  purple = 35,
  cyan = 36,
  white = 37
}

export enum BgColorNumbers {
  black = 40,
  red = 41,
  green = 42,
  yellow = 43,
  blue = 44,
  purple = 45,
  cyan = 46,
  white = 47
}

const prefix = '\x1b[';
const suffix = '\x1b[0m';
const textWrapper = (text?: string) => `m${text}`;

export enum TextEffects {
  none = 0,
  bold = 1,
  underline = 4,
  blink = 5,
  complementColor = 6
}

const colors = {
  // color
  red: () => Colors.print(this, [TextColorNumbers.red]),
  cyan: () => Colors.print(this, [TextColorNumbers.cyan]),
  yellow: () => Colors.print(this, [TextColorNumbers.yellow]),
  green: () => Colors.print(this, [TextColorNumbers.green]),
  // Style
  bold: () => Colors.print(this, [TextEffects.bold])
};

export class Colors {
  public static cyan(text: string): string {
    return Colors.print(text, [TextColorNumbers.cyan]);
  }

  public static yellow(text: string): string {
    return Colors.print(text, [TextColorNumbers.yellow]);
  }

  public static green(text: string): string {
    return Colors.print(text, [TextColorNumbers.green]);
  }

  public static bold(text: string): string {
    return Colors.print(text, [TextEffects.bold]);
  }

  public static print(text: string, effects: number[]): string {
    return `${prefix}${effects.join(';')}${textWrapper(text)}${suffix}`;
  }
}
