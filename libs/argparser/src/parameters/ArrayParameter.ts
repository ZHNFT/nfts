import { ParameterDefinition, ParameterTypes, IParameterDefinition } from '../classes/ParameterDefinition';

export interface ArrayParameterDefinition extends Omit<IParameterDefinition, 'type'> {
  alternatives: string[];
}

export class ArrayParameter extends ParameterDefinition {
  value?: string[];

  readonly alternatives: string[];

  constructor(definition: ArrayParameterDefinition) {
    super({
      type: ParameterTypes.Array,
      ...definition
    });

    this.alternatives = definition.alternatives;
  }
}
