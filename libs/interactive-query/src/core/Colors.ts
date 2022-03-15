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

export enum TextEffects {
  none = 0,
  bold = 1,
  underline = 4,
  blink = 5,
  complementColor = 6
}

export class Colors {
  private static _regex =
    /^\\x1b\[(?<bgColor>\d+);(?<textColor>\d+);(?<effects>\w+)m(?<text>\w.+)\\x1b\[0m$/;

  public static red(text: string): string {
    return Colors._print(text, TextColorNumbers.red);
  }

  public static cyan(text: string): string {
    return Colors._print(text, TextColorNumbers.cyan);
  }

  public static yellow(text: string): string {
    return Colors._print(text, TextColorNumbers.yellow);
  }

  public static bold(text: string): string {
    return Colors._print(text, 0, 0, [TextEffects.bold]);
  }

  private static _print(text: string, textColor = 0, bgColor = 0, effects = [0]): string {
    const {
      text: relText,
      textColor: prevTextColor,
      bgColor: prevBgColor,
      effects: prevEffects
    } = Colors._extractBeforeJoint(text);

    return `\\x1b[${bgColor ?? prevBgColor};${textColor ?? prevTextColor};${effects.join(
      ';'
    )}m${relText}\\x1b[0m`;
  }

  private static _extractBeforeJoint(text: string): {
    effects?: number[];
    textColor?: number;
    bgColor?: number;
    text: string;
  } {
    const result = Colors._regex.exec(text);

    if (!result) {
      return {
        text
      };
    }

    return {
      text: result.groups.text,
      textColor: Number(result.groups.textColor),
      bgColor: Number(result.groups.bgColor),
      effects: result.groups.effects.split(';').map(effect => Number(effect))
    };
  }
}
