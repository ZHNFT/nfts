import { TBaseDefinition } from './Command';

export class Argument implements TBaseDefinition {
  readonly name: string;
  readonly description: string;

  readonly belongTo: string;

  constructor({ name, description, belongTo }: TBaseDefinition & { belongTo?: string }) {
    this.name = name;
    this.description = description;
    this.belongTo = belongTo;
  }
}
