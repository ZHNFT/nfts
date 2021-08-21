interface ArgumentsOption {
  name: string;
  shortName?: string;
  default?: string | boolean;
  description?: string;
  validator?: (value: string) => boolean;
}

export type Spread<T> = {
  [P in keyof T]: T[P];
};

export type ParsedCommandLineOptions<T> = {
  _: string[];
} & Spread<T>;

const LONG_NAME_REGEXP = /^--\w+/;
const OPTION_NAME_REGEXP = /^[-]{1,2}\w/;

export default class ArgumentsParser {
  readonly name: string;

  constructor({ name }: { name: string }) {
    this.name = name;
  }
  /**
   * @public
   * @param options
   */
  addOptions(options: ArgumentsOption[]): void {
    //
  }

  static parser = <T extends Record<string, string | boolean | string[]>>(
    args: string[]
  ): ParsedCommandLineOptions<T> => argumentsParser<T>(args);
}

/**
 *
 * @param args
 *
 * @example
 *
 * const result = argumentsParser(['command', '--a', 'a', '-b', 'b', '--true', '--alsoTrue'])
 *
 * result // {
 *   _: ['command'],
 *   'a': 'a',
 *   'b': 'b',
 *   'true': true,
 *   'alsoTrue': true,
 *  }
 *
 */
export function argumentsParser<T>(
  args: string[]
): ParsedCommandLineOptions<T> {
  const obj = Object.create(null);

  let option: string;
  let prevFlagName: string;

  obj._ = [] as string[];

  while ((option = args.shift())) {
    if (OPTION_NAME_REGEXP.test(option)) {
      if (prevFlagName) {
        obj[prevFlagName] = true;
      }

      prevFlagName = LONG_NAME_REGEXP.test(option)
        ? option.replace('--', '')
        : option.replace('-', '');
    } else {
      if (prevFlagName) {
        obj[prevFlagName] = option;
      } else {
        obj._.push(option);
      }

      prevFlagName = '';
    }
  }

  return obj;
}
