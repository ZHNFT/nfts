import {
  OptionProvider,
  OptionDefinition,
  OptionTypes
} from '../provider/OptionProvider';

export interface ArrayOptionDefinition extends Omit<OptionDefinition, 'type'> {
  alternatives: string[];
}

export class ArrayOption extends OptionProvider {
  value?: string[];

  readonly alternatives: string[];

  constructor(definition: ArrayOptionDefinition) {
    super({
      type: OptionTypes.Array,
      name: definition.name,
      required: definition.required,
      callback: definition.callback,
      summary: definition.summary
    });

    this.alternatives = definition.alternatives;
  }
}
