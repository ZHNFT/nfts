import Logger from './Logger';
import TerminalProvider from './TerminalProvider';

interface CommandLineInfo {
  name: string;
  description: string;
}

type Spread<T> = {
  [P in keyof T]: T[P];
};

type ParsedCommandLineOptions<T extends {}> = { _: string[] } & Spread<T>;

const LONG_NAME_REGEXP = /^--\w+/;
const OPTION_NAME_REGEXP = /^[-]{1,2}\w/;

export default class CommandLineTool {
  readonly #_name: string;
  readonly #_description: string;
  readonly #_logger: Logger;
  readonly #_terminal: TerminalProvider;

  #_bin: string;
  #_executedFile: string;
  #_commandLineOptions: unknown;

  constructor({ name, description }: CommandLineInfo) {
    this.#_name = name;
    this.#_description = description;
    this.#_logger = new Logger({
      enableTimeSummary: true,
      verbose: true
    });

    this.#_terminal = new TerminalProvider({ name });
  }

  get commandLineOptions() {
    return this.#_commandLineOptions;
  }

  get name() {
    return this.#_name;
  }

  get description() {
    return this.#_description;
  }

  public parser(argv?: string[]) {
    const args = argv ?? process.argv;

    const [bin, executedFile, ...rawArgs] = args;

    this.#_bin = bin;
    this.#_executedFile = executedFile;
    this.#_commandLineOptions = argumentsParser(rawArgs);

    return this;
  }
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
export function argumentsParser(args: string[]) {
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
