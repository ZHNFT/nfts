import { CommandLineParser, ParserResult } from 'src/CommandLineParser';

interface CommandLineToolInitOptions {
  toolName: string;
  toolDescription: string;
}

interface ParamOptions {
  paramName: string;
  paramDescription: string;
}

export class CommandLineTool extends CommandLineParser {
  readonly _name: string;
  readonly _description: string;

  readonly _parameterByName: Map<string, ParamOptions>;

  constructor({ toolName, toolDescription }: CommandLineToolInitOptions) {
    super();

    this._name = toolName;
    this._description = toolDescription;
  }

  /**
   * @method 定义命令行参数
   */
  onParameterDefine(paramDefineOption: ParamOptions): void {
    this._parameterByName.set(paramDefineOption.paramName, paramDefineOption);
  }
}
