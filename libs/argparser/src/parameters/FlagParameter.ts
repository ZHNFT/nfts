import { ParameterDefinition, ParameterTypes, IParameterDefinition } from '../classes/ParameterDefinition';

export type FlagParameterDefinition = Omit<IParameterDefinition, 'type'>;

export class FlagParameter extends ParameterDefinition {
  value?: boolean;

  constructor(definition: FlagParameterDefinition) {
    super({
      type: ParameterTypes.Flag,
      ...definition
    });
  }
}
