import {
  StringParameter,
  StringOptionDefinition,
  ArrayParameter,
  ArrayParameterDefinition,
  FlagParameter,
  FlagParameterDefinition,
  SubParser
} from '@nfts/argparser';

export class CommandLineParameterImpl {
  public stringParameter(definition: StringOptionDefinition): StringParameter {
    return new StringParameter(definition);
  }

  public arrayParameter(definition: ArrayParameterDefinition): ArrayParameter {
    return new ArrayParameter(definition);
  }

  public flagParameter(definition: FlagParameterDefinition): FlagParameter {
    return new FlagParameter(definition);
  }
}

export class CommandLineParameterManager extends CommandLineParameterImpl {
  private parser: SubParser;

  constructor({ parser }: { parser: SubParser }) {
    super();

    this.parser = parser;
  }

  get name(): string {
    return this.parser.name;
  }

  get description(): string {
    return this.parser.description;
  }

  arrayParameter(definition: ArrayParameterDefinition): ArrayParameter {
    const _param = super.arrayParameter(definition);
    this.parser.addParam(_param);
    return _param;
  }

  flagParameter(definition: FlagParameterDefinition) {
    const _param = super.flagParameter(definition);
    this.parser.addParam(_param);
    return _param;
  }

  stringParameter(definition: StringOptionDefinition) {
    const _param = super.stringParameter(definition);
    this.parser.addParam(_param);
    return _param;
  }
}
