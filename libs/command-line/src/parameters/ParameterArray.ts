import { ParameterDefinitionBase, ParameterKinds } from './ParameterDefinition';

export class ParameterArray extends ParameterDefinitionBase {
  kind: ParameterKinds.array;
}
