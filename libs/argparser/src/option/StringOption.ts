import {
  OptionProvider,
  OptionDefinition,
  OptionTypes
} from '../provider/OptionProvider';

export type StringOptionDefinition = Omit<OptionDefinition, 'type'>;

export class StringOption extends OptionProvider {
  value?: string;

  constructor(definition: StringOptionDefinition) {
    super({
      type: OptionTypes.String,
      name: definition.name,
      required: definition.required,
      callback: definition.callback,
      summary: definition.summary
    });
  }
}
