import {
  OptionProvider,
  OptionDefinition,
  OptionTypes
} from '../provider/OptionProvider';

export type FlagOptionDefinition = Omit<OptionDefinition, 'type'>;

export class FlagOption extends OptionProvider {
  value?: boolean;

  constructor(definition: FlagOptionDefinition) {
    super({
      type: OptionTypes.Flag,
      name: definition.name,
      required: definition.required,
      callback: definition.callback,
      summary: definition.summary
    });
  }
}
