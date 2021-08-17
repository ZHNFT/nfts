import CommandLineTool from '@raydium/command-line-tool/CommandLineTool';
import { ArgumentsParser } from '@raydium/core/cmd/ArgumentsParser';
import * as process from 'process';

export default class CommandLineParser extends CommandLineTool {
  #_parser: ArgumentsParser;
  #_rawArgs: string[];

  constructor() {
    super({
      name: 'radium-cli',
      description: 'radium-cli good good good good good !!!'
    });

    this.#_parser = new ArgumentsParser();
  }

  /**
   * @public
   * @return {CommandLineParser}
   */
  async parser(): Promise<CommandLineParser> {
    this.#_rawArgs = process.argv;

    return this;
  }

  /**
   * @public
   * @return {CommandLineParser}
   */
  async execute(): Promise<CommandLineParser> {
    return this;
  }
}
