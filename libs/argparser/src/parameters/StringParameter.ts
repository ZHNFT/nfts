import { ParameterDefinition, ParameterTypes, IParameterDefinition } from '../classes/ParameterDefinition';

export type StringOptionDefinition = Omit<IParameterDefinition, 'type'>;

export class StringParameter extends ParameterDefinition {
  value?: string;

  constructor(definition: StringOptionDefinition) {
    super({
      type: ParameterTypes.String,
      ...definition
    });
  }
}
